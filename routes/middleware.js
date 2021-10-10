
require('dotenv').config();
const jwt=require('jsonwebtoken')

function authenticateToken(req,res,next){
  const authHeader=req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // Blogger TOKEN
  if(token==null){
    return res.sendStatus(400);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.status(403).send("Invalid Token");
    req.user=user
    
    next();
  })
}

function generateAccessToken(user){
  return jwt.sign(user.username,process.env.ACCESS_TOKEN_SECRET/* ,{expiresIn:'15s'} */)
}

module.exports={
  authenticateToken,
  generateAccessToken
}