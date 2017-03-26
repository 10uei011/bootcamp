//import the User model.
var User = require('../models/users.js');
var user = new User();
var serverConfig = require('../config/database.js');
/*
  @summary creates a user 
  @params req, res
  @returns status or error message
*/
exports.registerUser = function (req, res) {
  if (req.method.toLowerCase() !== 'post') {
    res.render('sign-up', { title: 'Sign Up' });
  } else {
    // console.log(req.body);
    if (!req.body.userName || !req.body.email || !req.body.password) {
      res.status(403).json({
        success: false, 
        message: 'Please fill all the form fields.'
      });
    } else {
      new User(req.body).save(function(err) {
        if (err) {
          // console.log(err);
          res.status(400).send({
            success: false,
            message: 'Unable to register user.'
          });
        } else { 
          res.status(200).json({
            success: true,
            message: 'Successfully registered user.'
          });
        }  
      });
    }  
  }
}

exports.login = function (req, res) {
  if (req.method.toLowerCase() !== 'post') {
    res.render('login', { title: 'Login' });
  } else {
    User.findOne({
      email: req.body.email
    }, function (err, result) {
      if (err) console.log(err);
      if (result == null) {
        res.status(403).json({
          success: false,
          message: 'Invalid email.'
        });
      } else {
        user.comparePassword(req.body.password, result.password, function (err, isMatch) {
          if (err || !isMatch) {
            res.status(403).json({
              success: false,
              message: 'Incorrect password.'
            });
          } else if (isMatch) {
            var token = jwt.encode(result, serverConfig.secret)
            res.status(200).json({
              success: true,
              token: token,
              message: 'User verified.'
            })
          }  
        }); 
      }
    });

  }
}