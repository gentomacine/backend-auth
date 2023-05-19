import express  from "express";
import { userRegistration } from "../controller/usercontroller.js";



const userRoute = express.Router();

//register user
 userRoute.post("/register", userRegistration)

export default userRoute;