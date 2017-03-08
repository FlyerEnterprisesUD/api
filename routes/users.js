// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var generatePassword = require('password-generator');
var User = require('../models/User.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ajaytest12345@gmail.com',
        pass: 'ajay-test'
    }
});

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
      var slug = generatePassword(10, false);
      var hash = bcrypt.hashSync(password, salt);

      var newUser = User.create({
        username: username,
        email: email,
        password: hash,
        role: 'user',
        slug: slug
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Flyer Enterprises" <patnaikaj@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Hello', // Subject line
          html: '<p><a href="http://localhost:5000/user/confirm/' + slug + '">Click here to confirm email</a></p>'// html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
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
      if(user.confirmed == 0) {
        res.json({
          response: {
            success: false,
            message: 'Please confirm email'
          }
        });
      }

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

router.post('/changepassword', function(req, res){
  var username = req.body.username;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;

  User.findOne({ where: {username: username} }).then(function(user) {
    var verify = bcrypt.compareSync(oldPassword, user.password);

    if(verify) {
      var hash = bcrypt.hashSync(newPassword, salt);
      User.update({
        password: hash
      }, {
        where: { id: user.id }
      });

      res.json({
        response: {
          success: true
        }
      });
    } else {
      res.json({
        response: {
          success: false,
          message: "Old Password did not match"
        }
      });
    }
  });
});

router.post('/resetpassword', function(req, res) {
  var email = req.body.email;

  User.findOne({ where: {email: email} }).then(function(user) {
    if(user) {
      var newPass = generatePassword(10, false);
      var hash = bcrypt.hashSync(newPass, salt);

      User.update({
        password: hash
      }, {
        where: { id: user.id }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Flyer Enterprises" <patnaikaj@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Hello', // Subject line
          html: '<p>Hello new password is </p>' + newPass // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });

      res.json({
        response: {
          success: true
        }
      });
    } else {
      res.json({
        response: {
          success: false,
          message: 'No user found'
        }
      });
    }
  });
});

router.get('/confirm/:slug', function(req, res){
  var slug = req.params.slug;

  User.findOne({ where: {slug: slug} }).then(function(user) {
    User.update({
      confirmed: true
    }, {
      where: { id: user.id }
    });

    res.writeHead(301,
      {Location: 'http://flyerenterprises.com/'}
    );
    res.end();
  });
});

module.exports = router;
