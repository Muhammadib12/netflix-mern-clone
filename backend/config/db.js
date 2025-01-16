import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB = async () => {
    try{
        const con = await mongoose.connect(ENV_VARS.MONGO_URL);
       
    }catch(e){
        console.error('Error conecting to MongoDB: ',e.message);
    }
}
