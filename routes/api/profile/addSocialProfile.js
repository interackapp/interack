const express = require("express"),
  passport = require("passport"),
  router = express.Router();
/* Load Shipment module */
const User = require("../../../models/user");

router.post(
  "/add-social-profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        social_links: {
            value: req.body.value,
            type: req.body.type
        },
        updated_on: Date.now(),
      },
      { new: true },
      (err, docs) => {
        if (err) {
          res.status(400).json(err);
        }
        res.json(docs);
      }
    );
  }
);

module.exports = router;