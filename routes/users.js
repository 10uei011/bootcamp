var express = require('express');

//initialize a instance of router for users
var router = express.Router();

//include the controller for user route
var users = require('../controllers/users.js');


//handler for all http requests to register a user 
router.route('/sign-up')
  .all(users.registerUser);

//handler for all http req for user login
router.route('/login')
  .all(users.login);  

//export the router instance
module.exports = router;