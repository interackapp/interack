const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  keys = require("../../../config/keys");
/* Load user module */
const User = require("../../../models/user");
/* 
  @route Post:change-password
  @access private
  @desc - Change Password
*/
router.post("/change-password", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(400).json({msg: "No user found for this email"})
      return;
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          await User.findOneAndUpdate(
            { email: req.body.email },
            { password: hash }
          );
          const payload = { id: user._id, email: user.email };
          jwt.sign(
            payload,
            keys.secretOrKey,
            (err, token) => {
              res.json({token, user, msg: "Password changed successfully"});
            }
          );
        });
      });
    }
  });
});
module.exports = router;