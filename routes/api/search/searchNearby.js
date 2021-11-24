const express = require("express"),
  passport = require("passport"),
  router = express.Router();
/* Load user module */
const User = require("../../../models/user");
router.get(
  "/search-nearby",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var METERS_PER_KM = 1000;
    // const user = await User.find({
    //     _id :{
    //         "$ne": req.user.id
    //     },
    //     visible: true
    // });
    // let random = user.sort(() => .5 - Math.random()).slice(0,12)
    User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)]
          },
          spherical: true,
          maxDistance: parseInt(req.query.distance) * METERS_PER_KM,
          distanceField: "distance"
        }
      },
      {
        $match: {
          _id: {
            "$ne": req.user.id
          },
          visible: true
        }
      },
    ])
      .then(doc => {
        let random = doc.sort(() => .5 - Math.random()).slice(0,12)
        res.json(random)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

module.exports = router;
