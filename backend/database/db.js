
import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/ekart-ecommerce`);
        console.log("MongoDB Connected Succesfully")
    } catch (error) {
        console.log("MongoDB connection failed:", error)
    }
}
export default ConnectDB

