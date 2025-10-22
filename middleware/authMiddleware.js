const jwt = require("jsonwebtoken")
   
   
const verifyToken = (req , res , next) => {
try {
      const authHeader= req.headers.authorization; // check the request header
   
if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401)
   .json({msg:"no token provided  access denied"}) //check if the token has started to avalale
}

   const token = authHeader.split(" ")[1]; //split the bearer and the real token.

   const decoded = jwt.verify(token , process.env.JWT_SECRET); // check if token is real and  valid
   req.user = decoded // attach the user info to the request after jwt is verified
   next(); // move to the next  route or function

} catch (error) {
    res.status(401).json({msg : "Invalid or expired token"}); //log an error
   
}
}

  module.exports = verifyToken;