import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app..js';
// import express from 'express'

// const app = express()


// (async () =>{
//   try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error", (error) =>{
//        console.log("Error", error)
//        throw error
//     })
//     app.listen(process.env.PORT, () =>{
//       console.log(`app is running on port ${process.env.PORT}`)
//     })
//   }
//   catch(error){
//     console.log("ERROR",error);
//     throw error
//   }
// })()
dotenv.config({
  path: './env'
})
connectDB()
.then(() =>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log('We caught an error : ', err)
})