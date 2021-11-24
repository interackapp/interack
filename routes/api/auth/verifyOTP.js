const express = require("express"),
	passport = require("passport"),
	router = express.Router(),
	jwt = require("jsonwebtoken"),
	keys = require("../../../config/keys");
/* Load user module */
const User = require("../../../models/user");
const OTP = require("../../../models/otp");

router.post(
	"/verify-otp",
	async (req, res) => {
		OTP.findOne({ phone: req.body.phone }).then((doc) => {
			if (!doc) {
				res.status(400).json({ otp: "OTP expired" })
			} else {
				if (doc.otp === req.body.otp) {
					if (doc.expiry > new Date()) {
						OTP.deleteOne({ phone: req.body.phone }, function (err) {
							if (err) return res.status(400).json(err);
							User.findOne({ phone: req.body.phone }).then((user) => {
								if (user) {
									const payload = { id: user._id, phone: user.phone, username: user.username };
									jwt.sign(
										payload,
										keys.secretOrKey,
										(err, token) => {
											res.json({ otp: "OTP verified", token, user })
										}
									);
								} else {
									res.json({ otp: "OTP verified", token: null, user: null })
								}
							})
						});
					} else {
						res.status(400).json({ otp: "OTP expired" })
					}
				} else {
					res.status(400).json({ otp: "Invalid OTP" })
				}
			}
		})
			.catch(err => {
				res.status(400).json(err)
			})
	}
);

module.exports = router;
