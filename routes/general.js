// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Main route
router.get('/', function(req, res){
  res.send('API for FE');
});

<<<<<<< HEAD
// Returns general promotions from json file
router.get('/promotions', function(req, res){
  res.sendfile('./promotions/general.json');
});

// The CHILL (returns json file)
router.get('/chill', function(req, res){
  res.sendfile('./info/chill.json');
=======
// Chill Menu (returns json file)
router.get('/chill-menu', function(req, res){
  res.sendfile('./menus/chill.json');
});

// Art Street Menu (returns json file)
router.get('/artstreet-menu', function(req, res){
  res.sendfile('./menus/artstreet.json');
>>>>>>> parent of 58cd06f... Merge branch 'ajay'
});

// Blend Express Menu (returns json file)
router.get('/blendexpress-menu', function(req, res){
  res.sendfile('./menus/blendexpress.json');
});

// Blend Menu (returns json file)
router.get('/blend-menu', function(req, res){
  res.sendfile('./menus/blend.json');
});

// Jury Box Menu (returns json file)
router.get('/jurybox-menu', function(req, res){
  res.sendfile('./menus/jurybox.json');
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
