const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authentication= async (req,res,next)=>{
  try{
      //extract token from request header.Token is provided in 'Authorization' header
      const token=req.header('Authorization');

      const user=jwt.verify(token , "secrectkey");//here token is varified where secret key used to sign JWT

      //to find user in database using retrieved userID.If user is found then user object is assigned to
      // req.user, allowing the user information to be accessed in subsequent middleware/route handlers. 
      // called to pass control to the next middleware/route handler.
      const userDetail=await User.findByPk(user.userId);
      req.user=userDetail;
      next();
  }
  catch(err){
      console.log(err);
      return res.status(500).json({success:false});
  }
}

//this middleware ensures that only authenticated request with valid JWT can acceess the protected route