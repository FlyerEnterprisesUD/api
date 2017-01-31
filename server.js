var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('API');
});

app.get('/chill-menu', function(req, res){
  res.sendfile('./menus/chill.json');
});

app.get('/chill-about', function(req, res){
  res.sendfile('./about/chill.json');
});

app.get('/promotions-general', function(req, res){
  res.sendfile('./promotions/general.json');
});

app.listen(PORT);
