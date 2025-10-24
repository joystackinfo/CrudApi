const express = require('express'); // include express
const { registerUser, loginUser,getAllUsers, deleteUser, updateUserRole,getSuperadminDashboard, getUserRole} = require('../controllers/user.controller.js'); //import controller function
const verifyToken = require('../middleware/authMiddleware.js');
const authorizeRoles = require('../middleware/authorizeRoles.js');


const router = express.Router(); // include express route


// Route for user registration
router.post('/register', registerUser);


//Route for user login
router.post('/login', loginUser); 

//Route for getAllUsers 
router.get('/', verifyToken, authorizeRoles('admin', 'superadmin'), getAllUsers);



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

//get user role by id
router.get('/users/:id/role', verifyToken, authorizeRoles('admin', 'superadmin'), getUserRole);


  // Superadmin-only route to delete a user
router.delete('/superadmin/users/:id',verifyToken,authorizeRoles("superadmin"),
  deleteUser
);





  //UPDATE ROLES ROUTE
  router.put('/users/:id/role', verifyToken, authorizeRoles('superadmin'), updateUserRole);
 router.get('/superadmin/dashboard',  verifyToken, authorizeRoles('superadmin'), getSuperadminDashboard)



module.exports = router; // export the router to be used in other files