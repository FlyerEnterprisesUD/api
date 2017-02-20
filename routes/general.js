// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Main route
router.get('/', function(req, res){
  res.send('API for FE');
});

// Chill Menu (returns json file)
router.get('/chill-menu', function(req, res){
  res.sendfile('./menus/chill.json');
});

// Chill About (returns json file)
router.get('/chill-about', function(req, res){
  res.sendfile('./about/chill.json');
});

// Returns general promotions from json file
router.get('/promotions-general', function(req, res){
  res.sendfile('./promotions/general.json');
});

module.exports = router;
