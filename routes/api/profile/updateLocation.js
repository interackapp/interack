const express = require("express"),
	passport = require("passport"),
	router = express.Router();
/* Load Shipment module */
const User = require("../../../models/user");

router.post(
	"/update-location",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		User.findOneAndUpdate(
			{ _id: req.user.id },
			{
				$set:{
					location: {
						coordinates : req.body.location,
						type : "Point"
					}
				}
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