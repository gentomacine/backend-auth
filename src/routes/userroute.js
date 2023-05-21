import express  from "express";
import { updateUser, userLogin,
         userProfile,
         userRegistration 
        } from "../controller/usercontroller.js";
import { isLogin } from "../middleware/loginmiddleware.js";



const userRoute = express.Router();

//register user
 userRoute.post("/register", userRegistration)

 //login user
 userRoute.post("/login", userLogin)

 //user profile
 userRoute.get("/profile",isLogin, userProfile)

 //Update User

 userRoute.put("/", isLogin, updateUser)

export default userRoute;