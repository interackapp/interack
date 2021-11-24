const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const shortid = require('shortid');
/* All Schema */

const userSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  short_bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  phone:{
    type: String,
    default: "",
  },
  avatar:{
    type: String,
    default: "",
  },
  social_links:{
    type: Array,
    default: [],
  },
  active:{
    type: Boolean,
    default: true
  },
  created_by: {
    type: String,
    required: true
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

module.exports = User = mongoose.model("users", userSchema);
