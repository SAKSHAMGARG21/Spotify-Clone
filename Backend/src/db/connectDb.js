import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config();
const connectDb=async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        console.log(`${process.env.MONGODB_URI} !! DB Name ${DB_NAME}`);
        console.log(`\nMongoDb connected !! DB Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error in connecting with DataBase :",error);
        process.exit(1);
    }
}

export default connectDb;