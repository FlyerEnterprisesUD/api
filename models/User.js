var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b6604c4169e159:8d28475f@us-cdbr-iron-east-04.cleardb.net/heroku_ebf4ee7fb666b53?reconnect=true', {
  dialect: 'mysql',
  pool: { maxIdleTime: 500, maxConnections: 5, minConnections: 0}
});

//Creating user table/model
var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  confirmed: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  year: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'users'
});

sequelize.sync();

module.exports = User;
