import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLUDINARY_NAME,
        api_key: process.env.CLUDINARY_API_KEY,
        api_secret: process.env.CLUDINARY_SECRET_KEY
    })
}

export default connectCloudinary;