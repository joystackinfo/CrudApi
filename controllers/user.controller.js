
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const User = require('../models/user.model');



//controller function to get all user
       const registerUser = async (req, res) => {
  try {
    const { username,email,password } = req.body;

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


//Get user role by id
const getUserRole = async (req, res) => {
  const user = await User.findById(req.params.id).select('username role');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.status(200).json({ username: user.username, role: user.role });
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
   

  //DASHBOARD CONTROLLER
  const getSuperadminDashboard = (req, res) => {
  res.status(200).json({ msg: 'Welcome to the Superadmin dashboard!' });
};


  // UPDATE USER ROLES
 
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const allowed = ['user', 'admin', 'superadmin'];

    // basic validation
    if (!role || !allowed.includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    // Prevent a user from changing their own role via this endpoint
    if (req.user && req.user.id === id) {
      return res.status(403).json({ error: "You can't change your own role" });
    }

    // Find the target user
    const target = await User.findById(id);
    if (!target) return res.status(404).json({ error: 'User not found' });

    // If the target is a superadmin and we're trying to demote them,
    // make sure we don't remove the last remaining superadmin.
    if (target.role === 'superadmin' && role !== 'superadmin') {
      const superadminCount = await User.countDocuments({ role: 'superadmin' });
      if (superadminCount <= 1) {
        return res.status(400).json({ error: 'Cannot demote the last superadmin' });
      }
    }

    // perform update
    target.role = role;
    await target.save();

    // return the updated user (without password)
    const updated = await User.findById(id).select('-password');
    res.status(200).json({ msg: 'User role updated', user: updated });
  } catch (error) {
    console.error('updateUserRole error:', error);
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser,
    updateUserRole,
      getSuperadminDashboard,
      getUserRole,
}; // export the controller functions to be used in other files