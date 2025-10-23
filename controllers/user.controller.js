
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
         password: hashedPassword,
         role: "user" // make it as a default role
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
      { id: user._id, role: user.role }, // include role and user info in token paylaod
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
    // Only admins and superadmins can fetch all users
    if (!req.user || !["admin", "superadmin"].includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find().select("-password"); // hide passwords
    res.status(200).json({ msg: "All users (admin access)", users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


//Delete a user(superadmin only)
  const deleteUser = async (req , res) =>{
    try {
       const userId = req.params.id;
const user = await User.findById(userId);
   if(!user) {
    return res.status(404).json({ msg: "User not found"})
   }

     await user.deleteOne(); //delete a user
      res.status(200).json({ msg: `User ${user.username} deleted successfully`}
      )

    } catch (error) {
      res.status(500).json ({ msg: "Server error" , error:error.message})
      
    }
  };


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser
}; // export the controller functions to be used in other files