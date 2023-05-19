import User from "../model/usermodel.js";
import bcrypt from "bcrypt";

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
