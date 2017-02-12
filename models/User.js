var Sequelize = require('sequelize');
var sequelize = new Sequelize('flyerent_api', 'flyerent_api', 'Enterprise_FLY$2017', {
  host: '208.102.174.206',
  dialect: 'mysql'
});

var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  tableName: 'users'
});

sequelize.sync();

module.exports = User;
