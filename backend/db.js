import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        if (connection) { console.log("Successfully connected to DB") }
    } catch (error) {
        console.log(error.message)
    }
}