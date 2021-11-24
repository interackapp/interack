const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const shortid = require('shortid');
/* All Schema */

const commentsSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  pin_id: {
    type: String,
    required: true,
    ref: "pins"
  },
  comment:{
    type: String,
    required: true,
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

module.exports = Comments = mongoose.model("comments", commentsSchema);
