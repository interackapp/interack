const express = require("express"),
	passport = require("passport"),
	router = express.Router();
/* Load user module */
const User = require("../../../models/user");
router.get(
	"/check-username",
	async (req, res) => {
		User.findOne({ username: req.query.username }).then((user) => {
			if (user) {
				res.status(400).json({ msg: "Username already exists" });
				return;
			} else {
				res.json({ msg: "Valid username" });
			}
		})
	}
);

module.exports = router;
