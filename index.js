var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var general = require('./routes/general');
//var users = require('./routes/users');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', general);

app.listen(app.get('port'));
