import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("something went wrong")
        console.log(error);
    }
}