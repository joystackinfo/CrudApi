const express = require('express'); // include express
const { registerUser, loginUser } = require('../controllers/user.controller.js'); //import controller function

const router = express.Router(); // include express router

// Route for user registration
router.post('/register', registerUser);

//Route for user login
router.post('/login', loginUser); 





module.exports = router; // export the router to be used in other files