import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully");
    });

    await mongoose.connect(`${process.env.MONGODB_URL}prescripto`);

};

export default connectDB;