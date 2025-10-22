
const { json } = require('express');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js'); // imort the user model


//controller function to get all user
       const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any field is missing
    if (!username || !email || !password) { 
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ msg: "User already exists" });
    }
         const hashedPassword = await bcrypt.hash(password, 12);
         const user = await User.create({
         username,
         email,
         password: hashedPassword
});
res.status(201).json({
  msg: "User registered successfully",
  user: {
    id: user._id,
    username: user.username,
    email: user.email
  }
});

  } catch (error) {
     res.status(500).json({message:error.message})
  }
};
  

//controller function for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}; // export the controller functions to be used in other files