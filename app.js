const express = require('express');//imports express.js module. use in creating express application, handling 
//HTTP request, middleware, route, serving static files, error handling, templating engines

const bodyParser = require('body-parser');// middleware for express.js that allow to parse the body of incoming
//request. helps to extract data from request body, such as form data or JSON and make it available in req.body
//object
const path = require('path');//provides utilities for working with file paths and directories and allows to
//perform operations like resolving, joining and manipulating file paths

const dotenv = require('dotenv');//load environment variables from a .env file into the Node.js process
// environment and simplifies the process of managing environment-specific configuration values.
dotenv.config();//loads the environment variables from the .env file in the current working directory and adds
//them to the process.env object

var cors = require('cors')//cross origin resource sharing.AlgAlg origin se jo request aa rhi use access de dena
//enforce security policies and prevent unauthorized access to resources.

const sequelize = require('./util/database');//sets up the connection to DB using sequelize, an ORM for Node.js
//object relational mapping(ORM) simplifies the interaction between object-oriented programming languages and 
//relational databases, providing a higher level of abstraction and productivity for developers. It helps 
//reduce the complexity of database operations, improves code maintainability, and enables database independence

const User = require('./models/user');// imports and associates the models with their respective 
//imports and associates the models with their respective relationships using Sequelize associations.

const userRoutes = require('./routes/user');//imports various route modules that handle different API endpoints.

const app = express();//create an express application

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(bodyParser.json({ extended: false })); //sets up the necessary middleware to parse incoming request
// bodies, including handling forms
app.use(express.json());  //this is for handling jsons payloads


app.use('/user', userRoutes);// routing for different API endpoints using app.use.

sequelize.sync()// synchronizes the database models with the database using sequelize.sync() and starts the
    .then(() => {// server on port 3000 using app.listen(3000).
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    })




    
    
    
    
    
    
     
    
    
    
    