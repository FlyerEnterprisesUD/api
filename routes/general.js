var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.send('API');
});

router.get('/chill-menu', function(req, res){
  res.sendfile('./menus/chill.json');
});

router.get('/chill-about', function(req, res){
  res.sendfile('./about/chill.json');
});

router.get('/promotions-general', function(req, res){
  res.sendfile('./promotions/general.json');
});

module.exports = router;
