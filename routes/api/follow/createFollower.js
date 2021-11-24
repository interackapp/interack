const express = require("express"),
	router = express.Router(),
	passport = require("passport");

/* Load modules */
const Follow = require("../../../models/follows");
const User = require("../../../models/user");

router.post(
	"/create-follower",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const checkFollower = await Follow.findOne({
				followee_id: req.body.followee_id
			})
			if(checkFollower){
				res.json(checkFollower);
			}else{
				const newFollower = new Follow({
					status: req.body.status,
					followee_id: req.body.followee_id,
					created_by: req.user.id,
					updated_on: Date.now()
				})
				const resp = await newFollower.save();
				if(req.body.status === "connected"){
					await User.findOneAndUpdate({_id :req.body.followee_id}, {$inc : {'follower_count' : 1}})
				}
				res.json(resp);
			}
		}
		catch (err) {
			console.error(err)
			res.status(400).json(err)
		}
	}
);
module.exports = router;