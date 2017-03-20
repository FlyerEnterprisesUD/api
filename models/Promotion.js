var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b6604c4169e159:8d28475f@us-cdbr-iron-east-04.cleardb.net/heroku_ebf4ee7fb666b53?reconnect=true', {
  dialect: 'mysql',
  pool: { maxIdleTime: 500, maxConnections: 5, minConnections: 0}
});

//Creating user table/model
var Promotion = sequelize.define('promotion', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  division: {
    type: Sequelize.STRING,
    allowNull: false
  },
  submitter: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  approved: {
    type: Sequelize.BOOLEAN,
    default: false,
    allowNull: false
  },
  time: {
    type: Sequelize.DATE,
    allowNull: true
  },
  ready: {
    type: Sequelize.BOOLEAN,
    default: false,
    allowNull: false
  }
}, {
  tableName: 'promotions'
});

sequelize.sync();

module.exports = Promotion;
