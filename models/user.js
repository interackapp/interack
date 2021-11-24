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
  username: {
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
  visible:{
    type: Boolean,
    default: true
  },
  follower_count:{
    type: Number,
    default: 0
  },
  pin_count:{
    type: Number,
    default: 0
  },
  google_id: {
    type: String
  },
  facebook_id: {
    type: String
  },
  location: {
    type: { 
      type: String, 
      enum: ["Point"], 
      default: "Point" 
    },
    coordinates: { 
      type: [Number], 
      default: [0, 0] 
    },
  },
  private:{
    type: Boolean,
    default: false
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
userSchema.index({ location: "2dsphere" });
module.exports = User = mongoose.model("users", userSchema);
