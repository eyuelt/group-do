var models = require('../models');

exports.createEvent = function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var new_event = new models.Event({
    "title": title,
    "description": description
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
  var new_user = new models.User({
    "username": username,
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
