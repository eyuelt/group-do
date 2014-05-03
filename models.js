var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
var GroupSchema = new Schema({
  "name": String,
  "date_created": Date,
  "members": [ UserSchema ]
  //"private": Boolean,
  //"salt": String,
  //"key": String
});
*/

/*
var UserSchema = new Schema({
  "username": String,
  "date_created": Date,
  "salt": String,
  "key": String
});
*/

var EventSchema = new Schema({
  //"creator": {type: Schema.ObjectId, ref:'UserSchema'},
  "date_created": Date,
  "title": String,
  "description": String,
  //"upvotes": [ VoteSchema ],
  //"downvotes": [ VoteSchema ]
  //"comments": [ CommentSchema ]
});

/*
var VoteSchema = new Schema({
  //"creator": {type: Schema.ObjectId, ref:'UserSchema'},
  "date_created": Date,
  "is_upvote": Boolean
});
*/

/*
var CommentSchema = new Schema({
  //"creator": {type: Schema.ObjectId, ref:'UserSchema'},
  "date_created": Date,

  "phone": Number
});
*/

//exports.Group = Mongoose.model('Group', GroupSchema);
//exports.User = Mongoose.model('User', UserSchema);
exports.Event = Mongoose.model('Event', EventSchema);
//exports.Vote = Mongoose.model('Vote', VoteSchema);
//exports.Comment = Mongoose.model('Comment', CommentSchema);
