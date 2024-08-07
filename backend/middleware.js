const JWT_secret = require("./config");
const Jwt = require('jsonwebtoken');

const authFuntion = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(403).json({ });
  }

try{
  const token = authHeader.split(' ')[1];

  const decoded = Jwt.verify(token, JWT_secret);
    req.userId = decoded.userId;  
    next();   
    
}catch(error){
    return res.status(403).json({message:"failed to verify"});
}
}
 
module.exports = authFuntion;