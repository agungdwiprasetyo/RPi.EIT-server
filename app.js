var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var connection = require('./connection');
var server = require('http').createServer(app);
var io = require('./socket/socket-io').listen(server);
var port = process.env.PORT || 3456;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(__dirname + '/rpieit-web'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();

var imageRoute = require('./routes/image');
imageRoute.configure(app);

var dataRoute = require('./routes/data');
dataRoute.configure(app);

var dataAlgor = require('./routes/algor');
dataAlgor.configure(app);