const User = require('../models/user');
const bcrypt = require('bcrypt');//used for hashing and comparing passwords in Node.js applications and
//provides a secure way to store and validate passwords by employing a cryptographic hashing algorithm.

const jwt = require('jsonwebtoken');//used for generating and verifying JSON Web Tokens(JWTs) in Node.js applications.
 //JWTs are compact and self-contained way of securely transmitting information between parties as JSON object.


 function generateAccessToken(id,Name,Email){
    console.log("token", Name, id, Email)
    return  jwt.sign({id:id, Name:Name, Email:Email},'SecretKey')
  }


 function isstringinvalid(string){
    if(string == undefined ||string.length === 0)
        return true
     else 
        return false
}

const signup = async (req , res)=>{// asynchronous function receiving req, res as parameters, that is likely
    // a route handler function in a server-side application
    console.log(req.body)
    try{
        const{name, email, phone, password} = req.body; // destructing assignment used to extract name, email, 
        // password, phone properties from req.body which are expexted to sent the request body
        console.log(req.body);
        const registereduser= await User.findOne({where :{email}});
        
        if(registereduser){
                 return res.status(200).json({message:"This email is already present so try login"});
        }

        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(phone) || isstringinvalid(password)){
            // if any of three is invalid, it returns a response with status 400(Bad Request) and JSON object 
            // containing an error message
            return res.status(400).json({err: "Bad parameters . Something is missing"})
        }
        const saltrounds = 10; // indicate number of saltround to use when hashing the password
        
        bcrypt.hash(password, saltrounds, async(err , hash)=>{ // bcrypt.hash is called to generate a hash of the
        //password using the provided salt rounds. it passes a callback function that takes err and hash as parameters
            console.log(err);
            await User.create({name, email, phone, password:hash})// User.create function is use to create new user in
            // database. it uses name, email and 'hashed' password values. await keyword is used before User.create 
            // to wait for the asynchronous operation to complete before proceeding
            res.status(201).json({message:"Succesfully created new user"})
        })
    } catch(err){
        console.log(err);
        await t.rollback()
        res.status(500).json({error: err});//internal server error
     }
}


const login = async (req, res) => { // login fn receives request and response as parameters indicating as 
                   //route handler function in a server side application
    try{
       const { email, password } = req.body; // destructing assignment used to extract 'email' and 'password'
            //from req.body. these properties are expected to sent in the request body

       if(isstringinvalid(email) || isstringinvalid(password)){ // if email or password is incorrect then it  
             // will return a response with a status 400(bad request) and JSON object containing a message and  
             // succeess properties indicating the failure    
            return res.status(400).json({message: 'EMail id or password is missing ', success: false})
       }

    console.log(password);
    const user  = await User.findAll({ where : { email }}) // User.findAll is called to find users with the
          //provided email. it is like ORM(object relational mapping) library like sequelize. await keyword is 
         // used to wait for the asynchronous operation to complete and return the result

        if(user.length > 0){
            // compare the provided password with stores hash password using bcrypt.compare. It passes callback
            // function that takes an error(err) and result as parameter
           bcrypt.compare(password, user[0].password, (err, result) => {
               if(err){
                   throw new Error('Sometng went wrong')
               }

                 if(result === true){
                     return res.status(200).json({
                        success: true, message: "User logged in successfully", 
                        token: generateAccessToken(user[0].id, user[0].name, user[0].email)
                    })
                 }else{
                       return res.status(400).json({success: false, message: 'Password is incorrect'})
                   }
             })
        } else {
            return res.status(404).json({success: false, message: 'User Doesnot exist'})
        }
    }catch(err){
      //return a status with status 500 (Internal Server Error) and a JSON object containing the error message
        res.status(500).json({message: err, success: false})
    }
}

module.exports = {
    signup,
    login,
    generateAccessToken
}