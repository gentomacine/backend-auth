import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generatetoken.js";
import { obtainTokenFromHeader } from "../utils/obtaintokenfromheader.js";


export const userRegistration = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Validate password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
export const userLogin = async(req, res) =>{
    const { email, password} = req.body;
    try {

// Check if user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ status: "success",
    data: {
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
        token: generateToken(foundUser._id)
    }, });
    } catch (error) {
        
    }
}
//Display user profile

export const userProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const token = obtainTokenFromHeader(req)
        const foundUser = await User.findById(req.userAuth);
        if (foundUser) {
            res.json({
                status: "success",
                data: { foundUser }
            });
        } else {
            res.json({
                status: "success",
                data: " user with such id doesnt exist"
            });
        }

    } catch (error) {
        res.json(error.message)
    }

}

//user update

export const updateUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const userId = req.userAuth; // Assuming you have the authenticated user ID

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user properties
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.json({ status: "success", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
