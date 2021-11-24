const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const shortid = require('shortid');
/* All Schema */

const followsSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  status:{
    type: String, //requested/connected/rejected
    required: true
  },
  followee_id:{
    type: String,
    required: true,
    ref: "users"
  },
  created_by: {
    type: String,
    required: true,
    ref: "users"
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    required: true
  }
});

module.exports = Follows = mongoose.model("follows", followsSchema);
