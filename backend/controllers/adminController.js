import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// api for adding doctor

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        //checking  for all data to all doctor

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // valdating email format

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter Valid Email" })
        }

        // validating for strong password

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter the Strong Password" })
        }

        // hashing doctor password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //uplaoading image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })

        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added Successfully" })


    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })
    }
}


// API for admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: "Server misconfiguration" });
        }

        // token expirs in 10000000000000000000000000 months

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10000000000000000000000000m" });


            return res.status(200).json({ success: true, token });
        }

        return res.status(401).json({ success: false, message: "Invalid Credentials" });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { addDoctor, loginAdmin }