const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  keys = require("../../../config/keys");
  // base = require("../../../config/base");

/* Load user module */
const User = require("../../../models/user");

/* Load validators */
const validateLoginInput = require("../../../validator/auth/login");

/* 
  @route post:  auth/login
  @access public
*/
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validations
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const {email, password} = req.body;
  User.findOne({ email }).then(user => {
    // Check user
    if (!user) {
      errors.email = "Invalid Email";
      return res.status(400).json(errors)
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user._id, email: user.email };
        jwt.sign(
          payload,
          keys.secretOrKey,
          (err, token) => {
            res.json({token, user});
          }
        );
      } else {
        errors.password = "Invalid Password";
        return res.status(400).json(errors)
      }
    });
  });
});

module.exports = router;
