const express = require("express"),
	router = express.Router(),
	jwt = require("jsonwebtoken"),
	keys = require("../../../config/keys");

/* Load user module */
const User = require("../../../models/user");
/* 
	@route Post:register      api/auth/register
	@access public
	*/
router.post("/facebook-signin", (req, res) => {
	User.findOne({ facebook_id: req.body.facebook_id }).then((user) => {
		if (user) {
			const payload = { id: user._id, phone: user.phone, username: user.username };
			jwt.sign(
				payload,
				keys.secretOrKey,
				(err, token) => {
					res.json({ token, user });
				}
			);
		} else {
			res.json({ token:null, user:null });
		}
	});
});
module.exports = router;
