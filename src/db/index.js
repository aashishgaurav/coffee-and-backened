import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";


const connectDB = async () =>{
  try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n Mongo DB connected HOST: ${connectionInstance.connection.host}`)
  }
  catch(error){
     console.log("MONGO DB Connection error ",error)
     process.exit(1)
  }
}

export default connectDB