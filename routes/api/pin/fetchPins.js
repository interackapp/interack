const express = require("express"),
	router = express.Router(),
	passport = require("passport");

/* Load modules */
const Pin = require("../../../models/pins");

router.get(
	"/fetch-pins",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			var METERS_PER_KM = 1000;
			// const pins = await Pin.find({})
			// res.json(pins);
			Pin.aggregate([
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
						visible: true,
						active: true
					}
				},
			])
			.then(doc => {
				Pin.populate(doc, {path: "created_by"})
        .then(async doc2 => {
          let random = doc2.sort(() => .5 - Math.random())
					res.json(random)
        });
				
			})
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
		}
		catch (err) {
			console.error(err)
			res.status(400).json(err)
		}
	}
);
module.exports = router;