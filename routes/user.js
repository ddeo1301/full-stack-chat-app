const express = require('express');
const router = express.Router(); // create new router object
const userController = require('../controller/user'); // imports module
const auth=require('../middleware/authenticate');

router.post('/signup', userController.signup);//signup is associated with UserController.signup controller is
router.post('/login', userController.login);//called when a POST request is made to the corresponding endpoints

module.exports = router; // router object is exported as a module, makeing it available for use in other parts of the application
// code setsup routes for user signup and login endpoints
