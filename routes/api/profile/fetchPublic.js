const express = require("express"),
  passport = require("passport"),
  router = express.Router();
/* Load user module */
const User = require("../../../models/user");
const Follow = require("../../../models/follows");

router.get(
  "/public-profile",
  async (req, res) => {
    const user = await User.findOne({ _id: req.query.id });
    const checkFollower = await Follow.findOne({followee_id: req.query.id});
    res.json({user, follow_info: checkFollower});
  }
);

module.exports = router;
