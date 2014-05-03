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
