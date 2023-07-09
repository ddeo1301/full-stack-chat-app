const User = require('../models/user');
const bcrypt = require('bcrypt');//used for hashing and comparing passwords in Node.js applications and
//provides a secure way to store and validate passwords by employing a cryptographic hashing algorithm.

const jwt = require('jsonwebtoken');//used for generating and verifying JSON Web Tokens(JWTs) in Node.js applications.
 //JWTs are compact and self-contained way of securely transmitting information between parties as JSON object.

 function isstringinvalid(string){
    if(string == undefined ||string.length === 0)
        return true
     else 
        return false
}

const signup = async (req , res)=>{// asynchronous function receiving req, res as parameters, that is likely
    // a route handler function in a server-side application
    try{
        const{name, email, phone, password} = req.body; // destructing assignment used to extract name, email, 
        // password, phone properties from req.body which are expexted to sent the request body

        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(phone) || isstringinvalid(password)){
            // if any of three is invalid, it returns a response with status 400(Bad Request) and JSON object 
            // containing an error message
            return res.status(400).json({err: "Bad parameters . Something is missing"})
        }
        const saltrounds = 10; // indicate number of saltround to use when hashing the password
        
        bcrypt.hash(password, saltrounds, async(err , hash)=>{ // bcrypt.hash is called to generate a hash of the
        //password using the provided salt rounds. it passes a callback function that takes err and hash as parameters
            console.log(err);
            await User.create({name, email, password:hash})// User.create function is use to create new user in
            // database. it uses name, email and 'hashed' password values. await keyword is used before User.create 
            // to wait for the asynchronous operation to complete before proceeding
            res.status(201).json({message:"Succesfully created new user"})
        })
    } catch(err){
        res.status(500).json(err);//internal server error
     }
}

module.exports = {
    signup
}