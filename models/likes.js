const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const shortid = require('shortid');
/* All Schema */

const likesSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  pin_id: {
    type: String,
    required: true,
    ref: "pins"
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

module.exports = Like = mongoose.model("likes", likesSchema);
