var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');


var general = require('./routes/general');
//var users = require('./routes/users');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var sequelize = new Sequelize('', '', '', {
  // sqlite! now!
  dialect: 'sqlite',

  // the storage engine for sqlite
  // - default ':memory:'
  storage: './database.sqlite3'
})

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

var user = User.create({
  username: 'test',
  email: 'test',
  password: 'test'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', general);

app.listen(app.get('port'));
