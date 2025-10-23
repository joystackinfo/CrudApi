 const authorizeRoles = (...allowedRoles) => { // allow roles

    return (req , res , next) =>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(401).json({error:"Access denied"});
        } // check if user exist and  if role is allowed
     
        next(); // continue to the route
    };


 };




 module.exports = authorizeRoles;