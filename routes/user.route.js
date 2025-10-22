const express = require('express'); // include express

const { registerUser, loginUser,getAllUsers } = require('../controllers/user.controller.js'); //import controller function
const verifyToken = require('../middleware/authMiddleware.js');
const router = express.Router(); // include express router

// Route for user registration
router.post('/register', registerUser);


//Route for user login
router.post('/login', loginUser); 

//Route for getAllUsers
router.get('/', getAllUsers) 


//protected Route(user profile)
 router.get('/profile' , verifyToken , (req , res) =>{ 
    res.status(200).json({
        msg: "Welcome to your profile",
        user:req.user  // info decoded from from the jwt
    });
 }

) ;


module.exports = router; // export the router to be used in other files