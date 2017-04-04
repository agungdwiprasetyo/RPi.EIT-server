var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var connectDB = require('./connectDB');
var server = require('http').createServer(app);
var io = require('./socket/socket-io').listen(server);
var imageRoute = require('./routes/image');
var dataRoute = require('./routes/data');
var dataAlgor = require('./routes/algor');
var perangkatEIT = require('./routes/perangkat');
var shell = require('./shell/callshell');
var upload = require('./uploads/upload');
var port = process.env.PORT || 1993;

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

app.use(express.static(__dirname + '/RPi.EIT-web'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connectDB.init();
shell.start();

imageRoute.configure(app);
dataRoute.configure(app);
dataAlgor.configure(app);
perangkatEIT.configure(app);
upload.configure(app);