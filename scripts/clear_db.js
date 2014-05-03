/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.
  This script will create a local Mongo database on your
  machine if it doesn't already exist. If it does, it will
  clear the User and Event objects from it.
*/

var mongoose = require('mongoose');
var models = require('../models');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'group-do';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);


// Keep track of how many calls to remove have not yet completed
var unfinishedCount = 0;
unfinishedCount++; //to make sure that it doesn't reach 0 before all removes have begun

// Remove all events
unfinishedCount++;
models.Event
  .find()
  .remove()
  .exec(onceClear);


unfinishedCount--; //to make sure that it doesn't reach 0 before all removes have begun

// Close connection when both removes are done
function onceClear(err) {
  if (err) console.log(err);
  unfinishedCount--;
  if (unfinishedCount <= 0) mongoose.connection.close();
}
