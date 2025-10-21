
const { json } = require('express');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js'); // imort the user model


//controller function to get all user
    const registerUser = async (req, res) => {
      try{
      const user = await User.create(req.body); //create new user
      res.status(200) .json(user)
  }
   catch (error) {
    res.status(500).json({message:error.message})
  }
};


//controller function for user login
const loginUser = async (req, res) => {
      
    try {
        const{username , email , password} = req.body; //pulling  the data from the req.body
        if(!email || !password){
            return res.status(400).json({msg:"all fields are required"}) // check if email and password are provided
        }
       const user = await  User.findOne({email}); // find user by email
       if(!user){
        return res.status(404)
        .json({msg:"User not found"}) // if user not found
       }
        const isMatch = await bcrypt.compare(password, user.password); //compare and check if password is correct
        if(!isMatch){
            return res.status(401) // unauthorized
            .json({msg:"Invalid credentials"}) // if password is incorrect
        }
      const token = jwt.sign( // create the jwt token
        {id:user._id}, // payload(the data/information to be stored in the token)
        process.env.JWT_SECRET, // secret key to sign the token(to protect it from being tampered with)
        {expiresIn:'1h'} // token expiration time
      )
      res.status(200).json({
        msg:"Login successful",
        token,
        user:{
            id:user._id, 
            username:user.username, 
            email:user.email 
        } // send user data in response
      });
    } catch (error) {
       res.status(500).json({message:error.message})
    }
};











module.exports = {
    registerUser,
    loginUser
}; // export the controller functions to be used in other files