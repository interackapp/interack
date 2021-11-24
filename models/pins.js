const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const shortid = require('shortid');
/* All Schema */

const pinsSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  media: {
    type: String,
    required: true
  }, 
  caption: {
    type: String,
    default: ""
  },
  tags: {
    type: [String],
    ref: "users",
    default: []
  },
  active:{
    type: Boolean,
    default: true
  },
  visible:{
    type: Boolean,
    default: true
  },
  comment_count:{
    type: Number,
    default: 0
  },
  like_count:{
    type: Number,
    default: 0
  },
  like_user_ids:{
    type: [String],
    default: [],
    ref: "users"
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
  address:{
    type: String,
    default: ""
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
pinsSchema.index({ location: "2dsphere" });
module.exports = Pin = mongoose.model("pins", pinsSchema);
