var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var general = require('./routes/general');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', general);

app.listen(PORT);
