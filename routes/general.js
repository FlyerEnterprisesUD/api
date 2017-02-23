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

// Art Street Menu (returns json file)
router.get('/artstreet-menu', function(req, res){
  res.sendfile('./menus/artstreet.json');
});

// Blend Express Menu (returns json file)
router.get('/blendexpress-menu', function(req, res){
  res.sendfile('./menus/blendexpress.json');
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
