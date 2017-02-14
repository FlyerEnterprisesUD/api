var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/User.js');

var salt = bcrypt.genSaltSync(10);

router.get('/', function(req, res){
  res.send('user');
});

router.post('/create', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  var hash = bcrypt.hashSync(password, salt);

  var user = User.create({
    username: username,
    email: email,
    password: hash
  });

  if(user) {
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

});

module.exports = router;
