const express = require("express"),
  passport = require("passport"),
  router = express.Router();
/* Load Shipment module */
const User = require("../../../models/user");

/* Load validator */
const validateRegisterInput = require("../../../validator/auth/register");

router.post(
  "/edit-profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // check validations
    if (!isValid) {
      res.status(400).json(errors);
      return;
    }
    const respUsername = await User.findOne({ username: req.body.username });
    if (respUsername) {
      if(respUsername.username !== req.body.username){
        errors.username = "Username already exists";
        res.status(400).json(errors);
        return;
      }else{
        User.findOneAndUpdate(
          { _id: req.user.id },
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            short_bio: req.body.short_bio,
            avatar: req.body.avatar,
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
    }else{
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          short_bio: req.body.short_bio,
          avatar: req.body.avatar,
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
  }
);

module.exports = router;