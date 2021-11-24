const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* All Schema */

const otpSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  otp:{
    type: String,
    required: true
  },
  expiry:{
    type: Date,
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

module.exports = OTP = mongoose.model("otps", otpSchema);
