
const { json } = require('express');
const User = require('../models/user.model.js'); // imort the user model


//controller function to get all user
    const registerUser = async (req, res) => {
      try{
      const user = await User.create(req.body);
      res.status(200) .json(user)
  }
   catch (error) {
    res.status(500).json({message:error.message})
  }
};


//controller function for user login
const loginUser = async (req, res) => {
      
    try {
        const{username , email , password} = req.body; //destructuring the data from the req.body
        
    } catch (error) {
        
    }
};











module.exports = {
    registerUser,
    loginUser
}; // export the controller functions to be used in other files