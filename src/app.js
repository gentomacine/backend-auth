import express from "express";
import dotenv from 'dotenv'
import { dbConnect } from './config/dbConnect.js'
import userRoute from "./routes/userroute.js";
dotenv.config();
dbConnect();

const app = express();

//middleware
app.use(express.json())


//routes
app.use("/api/v1/users", userRoute)



const PORT = process.env.Port || 3012;
app.listen(PORT, console.log(`Server is runnng at ${PORT}`))