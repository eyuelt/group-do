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
