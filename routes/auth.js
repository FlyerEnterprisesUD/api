var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../models/User');

router.use(function(req, res, next){
  var token = req.body.token || req.headers['token'];

  if(token){
    jwt.verify(token, process.env.SECRET, function(err, decode){
      if(err){
        res.json({success: false});
      } else {
        next();
      }
    });
  } else {
    res.json({success: false});
  }
});

router.post('/verify', function(req, res) {
  var token = req.body.token || req.headers['token'];
  var decoded = jwt.verify(token, process.env.SECRET);
  res.json({
    response: {
      success: true,
      user: decoded
    }
  });
});

//var decoded = jwt.verify(token, 'shhhhh');

module.exports = router;
