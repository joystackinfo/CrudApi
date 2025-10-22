const jwt = require("jsonwebtoken")
   
try {
    
const verifyToken = (req , res , next) =>
    constauthHeader= req.headers.authorization; // check the request header
   
if(!authHeader || !authHeader.startsWITH("Bearer "))
    return res.status(401)
   .json({msag:"no token provided  access denied"}) //check if the token has started to avalale
     

   const token = authHeader.split(" ")[1]; //split the bearer and the real token.

   const decoded = jwt.verify(token , process.env.JWT_SECRET); // check if token is real and  valid
   req.user = decoded // attach the user info to the request after jwt is verified
   next(); // move to the next  route or function

   } catch (error) {
   return res.status(401).json({msg: "Invalid or expired token"})
}