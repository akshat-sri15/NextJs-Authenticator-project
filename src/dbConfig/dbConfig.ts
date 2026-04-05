import mongoose from "mongoose";

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
    ///console.log("❌ ENV NOT LOADED");
    throw new Error("MONGO_URI is missing");
}

console.log("✅ ENV FOUND:", process.env.MONGO_URI);

await mongoose.connect(process.env.MONGO_URI);
        //console.log("MONGO_URI:", process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("something went wrong")
        console.log(error);
    }
}