const express = require("express"),
	router = express.Router(),
	passport = require("passport");

/* Load modules */
const Follow = require("../../../models/follows");

router.get(
	"/fetch-follow-requests",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const followers = await Follow.find({
				followee_id: req.user.id,
                status: "requested"
			}).populate("created_by")
            res.json(followers)
		}
		catch (err) {
			console.error(err)
			res.status(400).json(err)
		}
	}
);
module.exports = router;