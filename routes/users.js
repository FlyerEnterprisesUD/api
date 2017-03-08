// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/User.js');

// Generate Salt
var salt = bcrypt.genSaltSync(10);

router.get('/', function(req, res){
  res.send('user');
});

//Create User route
router.post('/create', function(req, res){
  // Getting fields from app
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // Checking if username already exixts
  User.findOne({ where: {username: username} }).then(function(user) {
    if(user) {
      res.json({
        response: {
          success: false,
          message: 'Username Already Taken'
        }
      });
    } else {
      //Creating new user if username doesn't already exist
      var hash = bcrypt.hashSync(password, salt);

      var newUser = User.create({
        username: username,
        email: email,
        password: hash,
        role: 'user'
      });

      if(newUser) {
        res.json({
          response: {
            success: true
          }
        });
      } else {
        res.json({
          response: {
            success: false,
            message: 'Something messed up. Try again later'
          }
        });
      }
    }
  });

});

//Login Route
router.post('/login', function(req, res) {
  //Getting fields from app
  var username = req.body.username;
  var password = req.body.password;

  //Finding user in database
  User.findOne({ where: {username: username} }).then(function(user) {
    if(user) {
      var verified = bcrypt.compareSync(password, user.password);
      var tempUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      }

      //Creating token
      if(verified){
        var token = jwt.sign(tempUser, process.env.SECRET, { expiresIn: 60*60*24*12 });

        delete tempUser.password;
        res.json({
          response: {
            success: true,
            user: tempUser,
            token: token
          }
        });
      } else {
        res.json({
          response: {
            success: false,
            message: 'Something went wrong. Invalid password'
          }
        });
      }
    } else {
      res.json({
        response: {
          success: false,
          message: 'Invalid credentials'
        }
      });
    }

  });
});

module.exports = router;
