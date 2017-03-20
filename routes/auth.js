// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var UserCard = require('../models/UserCard');
var Card = require('../models/Card');
var Promotion = require('../models/Promotion');
var CronJob = require('cron').CronJob;

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

router.post('/getapproves', function(req, res){
  Promotion.findAll({ where: {approved: false}, order: [['createdAt', 'DESC']] }).then(function(promos) {
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

router.post('/approve', function(req, res){
  var id = req.body.id;
  var title = req.body.title;
  var division = req.body.division;
  var body = req.body.body;
  var time = req.body.time;

  Promotion.findOne({ where: {id: id} }).then(function(promotion) {
    if(promotion) {
      Promotion.update({
        approved: true,
        title: title,
        division: division,
        body: body,
        time: time,
        ready: true
      }, {
        where: { id: promotion.id }
      });

      res.json({
        response: {
          success: true
        }
      });
    }
  });
});

router.post('/deny', function(req, res){
  var id = req.body.id;

  Promotion.findOne({ where: {id: id} }).then(function(promotion) {
    if(promotion) {
      Promotion.destroy({
        where: { id: promotion.id }
      });

      res.json({
        response: {
          success: true
        }
      });
    }
  });
});

router.post('/submit', function(req, res){
  var title = req.body.title;
  var division = req.body.division;
  var submitter = req.body.submitter;
  var time = req.body.time;
  var body = req.body.body;

  var ready = false;
  if(time == "now") {
    time = Date();
    ready = true;
  }

  var newPromotion = Promotion.create({
    title: title,
    division: division,
    submitter: submitter,
    body: body,
    time: time,
    approved: false,
    ready: ready
  }).then(function(promo){
    if(ready == false) {
      new CronJob(new Date(time), function() {
        Promotion.update({
          ready: true
        }, {
          where: { id: promo.id }
        });
      }, null, true, 'America/Los_Angeles');
    }
  });

  if(newPromotion) {
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

});

module.exports = router;
