var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//var User = require('../models/User.js');

var salt = bcrypt.genSaltSync(10);


module.exports = router;