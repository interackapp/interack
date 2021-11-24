const express = require("express"),
  passport = require("passport"),
  router = express.Router();
/* Load user module */
const User = require("../../../models/user");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    res.json(user);
  }
);

module.exports = router;
