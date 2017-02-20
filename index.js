// Requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Routes
var general = require('./routes/general');
var users = require('./routes/users');
var auth = require('./routes/auth');

// Set port and process variables
app.set('port', (process.env.PORT || 5000));
process.env.SECRET = 'test';

// set main dir to /public
app.use(express.static(__dirname + '/public'));

// Needed for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using routes
app.use('/', general);
app.use('/user', users);
app.use('/auth', auth);

//Listen on the port
app.listen(app.get('port'));
