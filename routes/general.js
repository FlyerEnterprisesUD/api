// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Promotion = require('../models/Promotion');

// Main route
router.get('/', function(req, res){
  res.send('API for FE');
});

// Returns general promotions from json file
router.get('/promotions', function(req, res){
  res.sendfile('./promotions/general.json');
});

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

router.post('/getpromotions', function(req, res){
  var division = req.body.division;

  Promotion.findAll({ where: {approved: true, ready: true, division: division}, order: [['createdAt', 'DESC']], limit: 25 }).then(function(promos) {
    if(promos){
      res.json({
        response: {
          success: true,
          promotions: promos
        }
      });
    }
  });
});

module.exports = router;
