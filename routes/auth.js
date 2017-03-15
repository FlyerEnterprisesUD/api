// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var UserCard = require('../models/UserCard');
var Card = require('../models/Card');

// Make sure that the user is authenticated
router.use(function(req, res, next){
  var token = req.body.token || req.headers['token'];

  if(token){
    jwt.verify(token, process.env.SECRET, function(err, decode){
      if(err){
        res.json({
          response: {
            success: false,
            message: 'Invalid Token'
          }
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      response: {
        success: false,
        message: 'No Token Found'
      }
    });
  }
});

// Verify that token hasn't expired and send user object back
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

router.post('/punch', function(req, res){
  var userId = req.body.userId;
  var cardId = req.body.cardId;

  UserCard.findOne({ where: {userId: userId, cardId: cardId} }).then(function(usercard) {
    if(usercard) {
      var newPoints = usercard.points + 1;

      UserCard.update({
        points: newPoints,
        lastPunchDate: Date()
      }, {
        where: { id: usercard.id }
      });

      res.json({
        response: {
          success: true
        }
      });
    }
  });
});

router.post('/redeem', function(req, res){
  var userId = req.body.userId;
  var cardId = req.body.cardId;

  UserCard.findOne({ where: {userId: userId, cardId: cardId} }).then(function(usercard) {
    if(usercard) {
      var completed = usercard.completed + 1;

      UserCard.update({
        points: 0,
        completed: completed
      }, {
        where: { id: usercard.id }
      });

      res.json({
        response: {
          success: true
        }
      });
    }
  });
});

router.post('/getcards', function(req, res){
  var division = req.body.division;

  Card.findAll({ where: {division: division} }).then(function(cards) {
    if(cards){
      res.json({
        response: {
          success: true,
          cards: cards
        }
      });
    }
  });
});

router.post('/favorite', function(req, res){
  var userId = req.body.userId;
  var cardId = req.body.cardId;

  UserCard.findOne({ where: {userId: userId, cardId: cardId} }).then(function(usercard) {
    if(usercard) {

      var favorite;
      if(usercard.favorite == 0) {
        favorite = 1;
      } else {
        favorite = 0;
      }

      UserCard.update({
        favorite: favorite
      }, {
        where: { id: usercard.id }
      });

      res.json({
        response: {
          success: true
        }
      });
    }
  });
});

router.post('/getfavorites', function(req, res){
  var userId = req.body.userId;

  UserCard.findAll({ where: {favorite: 1, userId: userId}, include: [{ model: Card }] }).then(function(usercards) {
    if(usercards) {
      res.json({
        response: {
          success: true,
          cards: usercards
        }
      });
    }
  });

});

router.post('/getcard', function(req, res){
  var cardId = req.body.cardId;
  var userId = req.body.userId;
  var division = req.body.division;

  UserCard.findOne({ where: {userId: userId, cardId: cardId} }).then(function(usercard) {
    if(usercard) {
      res.json({
        response: {
          success: true,
          card: usercard
        }
      });
    } else {
      var newUserCard = UserCard.create({
        userId: userId,
        cardId: cardId,
        points: 0,
        lastPunchDate: null,
        completed: 0,
        division: division,
        favorite: 0
      });

      if(newUserCard) {
        res.json({
          response: {
            success: true,
            card: newUserCard
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

module.exports = router;
