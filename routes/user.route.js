const express = require('express'); // include express
const verifyToken = require('../middleware/verifyToken.js'); // export token middleware
const { registerUser, loginUser } = require('../controllers/user.controller.js'); //import controller function

const router = express.Router(); // include express router

// Route for user registration
router.post('/register', registerUser);

//Route for user login
router.post('/login', loginUser); 


//protected Route(user profile)
 router.get('/profile' , verifyToken , (req , res) =>{ 
    res.status(200).json({
        msg: "Welcome to your profile",
        user:req.user  // info decoded from from the jwt
    });
 }

) ;


module.exports = router; // export the router to be used in other files