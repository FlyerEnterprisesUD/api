// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Main route
router.get('/', function(req, res){
  res.send('API for FE');
});

// Returns general promotions from json file
router.get('/promotions-general', function(req, res){
  res.sendfile('./promotions/general.json');
});

// ---------------

// The CHILL (returns json file)
router.get('/chill', function(req, res){
  res.sendfile('./info/chill.json');
});

// The Jury Box (returns json file)
router.get('/jurybox', function(req, res){
  res.sendfile('./info/jurybox.json');
});

// The Blend (returns json file)
router.get('/blend', function(req, res){
  res.sendfile('./info/blend.json');
});

// The Blend (returns json file)
router.get('/blendexpress', function(req, res){
  res.sendfile('./info/blendexpress.json');
});

// The Blend (returns json file)
router.get('/artstreet', function(req, res){
  res.sendfile('./info/artstreet.json');
});

// The Blend (returns json file)
router.get('/stuslanding', function(req, res){
  res.sendfile('./info/stuslanding.json');
});

// The Blend (returns json file)
router.get('/galley', function(req, res){
  res.sendfile('./info/galley.json');
});

module.exports = router;
