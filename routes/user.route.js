const express = require('express'); // include express
const { registerUser, loginUser,getAllUsers, deleteUser } = require('../controllers/user.controller.js'); //import controller function
const verifyToken = require('../middleware/authMiddleware.js');
const authorizeRoles = require('../middleware/authorizeRoles.js');
const User = require('../models/user.model.js');

const router = express.Router(); // include express route


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
 }) ;

 //Admin-only route
router.get(  '/admin/users' ,verifyToken,authorizeRoles("admin", "superadmin"),
  getAllUsers // use the controller instead of inline logic
);



  // Superadmin-only route to delete a user
router.delete('/superadmin/users/:id',verifyToken,authorizeRoles("superadmin"),
  deleteUser
);

 


module.exports = router; // export the router to be used in other files