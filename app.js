var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var api = require('./routes/api');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'group-do';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);

var app = express();

// all environments
app.configure(function() {
  var session_secret = process.env.SESSION_SECRET;
  if (!session_secret) {
    throw Error("SESSION_SECRET environment variable not defined");
  }
  app.set('port', process.env.PORT || 8000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.locals.pretty = true;
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: session_secret}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
});

// Add routes here
app.get('/home/:group_name', index.homepage);
app.get('/board/:group_name', index.boardPage);
app.get('/newevent/:group_name', index.newEventPage);
app.get('/newuser', index.newUserPage);
app.get('/login', index.loginPage);

// API
app.post('/api/event', api.createEvent);
app.get('/api/event', api.getEvents);
app.post('/api/user', api.createUser);
app.get('/api/user', api.getUsers);
app.post('/api/auth', api.createAuthentication);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
