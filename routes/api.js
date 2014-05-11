var models = require('../models');
var crypto = require('crypto');

var KDF_NUM_ITERS = 100000;
var KDF_KEY_SZ = 256;
var SALT_NUM_BYTES = 16;

exports.createEvent = function(req, res) {
  if (!req.session.user_id)
    res.send(403); //403: Forbidden
  var title = req.body.title;
  var description = req.body.description;
  var user_id = req.session.user_id;
  var new_event = new models.Event({
    "title": title,
    "description": description,
    "creator": user_id
  });
  new_event.save(function(err) {
    if (err) { console.log(err); res.send(500); }
    res.send(201);
  });
};

exports.getEvents = function(req, res) {
  var search_options = {};
  models.Event.find(search_options).select('-__v').exec(function (err, events) {
    if (err) { console.log(err); res.send(500); }
    var result = {};
    result.events = events;
    res.json(result);
  });
};

exports.createUser = function(req, res) {
  var username = req.body.username;
  var salt = crypto.randomBytes(SALT_NUM_BYTES).toString('hex');
  var key = crypto.pbkdf2Sync(req.body.password, salt, KDF_NUM_ITERS, KDF_KEY_SZ).toString('hex');
  var new_user = new models.User({
    "username": username,
    "salt": salt,
    "key": key
  });
  new_user.save(function(err) {
    if (err) { console.log(err); res.send(500); }
    res.send(201);
  });
};

exports.getUsers = function(req, res) {
  var search_options = {};
  models.User.find(search_options).select('-__v').exec(function (err, users) {
    if (err) { console.log(err); res.send(500); }
    var result = {};
    result.users = users;
    res.json(result);
  });
};

//login
exports.getAuthentication = function(req, res) {
  checkLogin(req.query.username, req.query.password, function(is_valid_login, user_id) {
    if (is_valid_login) {
      req.session.user_id = user_id;
      res.send(204); //204: No Content
    } else {
      res.send(403); //403: Forbidden
    }
  });
};

function checkLogin(username, password, callback) {
  models.User.find({ "username": username }).exec(function(err, users) {
    if (err) { console.log(err); res.send(500); };
    if (users.length === 1) {
      var user = users[0];
      var key = crypto.pbkdf2Sync(password, user.salt, KDF_NUM_ITERS, KDF_KEY_SZ).toString('hex');
      if (user.key === key) {
        callback(true, user._id);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
