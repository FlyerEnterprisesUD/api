var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b6604c4169e159:8d28475f@us-cdbr-iron-east-04.cleardb.net/heroku_ebf4ee7fb666b53?reconnect=true', {
  dialect: 'mysql',
  pool: { maxIdleTime: 500, maxConnections: 5, minConnections: 0}
});

//Creating user table/model
var Card = sequelize.define('card', {
  division: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  total: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'cards'
});

sequelize.sync();

module.exports = Card;
