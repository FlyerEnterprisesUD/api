var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b6604c4169e159:8d28475f@us-cdbr-iron-east-04.cleardb.net/heroku_ebf4ee7fb666b53?reconnect=true', {
  dialect: 'mysql',
  pool: { maxIdleTime: 500, maxConnections: 5, minConnections: 0}
});

var Card = require('./Card');
var User = require('./User');

//Creating user table/model
var UserCard = sequelize.define('usercard', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cardId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  lastPunchDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  completed: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  division: {
    type: Sequelize.STRING,
    allowNull: false
  },
  favorite: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  tableName: 'usercards'
});

Card.hasMany(UserCard);
UserCard.belongsTo(Card);
//User.hasMany(UserCard);

sequelize.sync();

module.exports = UserCard;
