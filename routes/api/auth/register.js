const express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  keys = require("../../../config/keys");
// base = require("../../../config/base");

/* Load user module */
const User = require("../../../models/user");

/* Load validator */
const validateRegisterInput = require("../../../validator/auth/register");
/* 
  @route Post:register      api/auth/register
  @access public
  */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validations
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }
  User.findOne({ phone: req.body.phone }).then(async(user) => {
    if (user) {
      if(typeof req.body.google_id === undefined && typeof req.body.facebook_id === undefined){
        errors.phone = "Phone already exists";
        res.status(400).json(errors);
        return;
      }
    }
      const respUsername = await User.findOne({ username: req.body.username });
      if(respUsername){
        errors.username = "Username already exists";
        res.status(400).json(errors);
        return;
      }
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        username: req.body.username,
        updated_on: Date.now(),
      });
      newUser.created_by = newUser._id;
      if(req.body.google_id){
        newUser.google_id = req.body.google_id;
      }
      if(req.body.facebook_id){
        newUser.facebook_id = req.body.facebook_id;
      }
      if(req.body.avatar){
        newUser.avatar = req.body.avatar;
      }
      newUser
      .save()
      .then((user) => {
        // User Matched
        const payload = { id: user._id, phone: user.phone, username: user.username };
        jwt.sign(
          payload,
          keys.secretOrKey,
          (err, token) => {
            res.json({ msg: "Registration Successfull", token, user });
          }
        );
      })
      .catch((err) => res.status(400).json(err));
  });
});
module.exports = router;
