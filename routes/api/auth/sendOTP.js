const express = require("express"),
	router = express.Router();

/* Load user module */
const User = require("../../../models/user");
const OTP = require("../../../models/otp");

const fetch = require("node-fetch");
/* 
	@route Post:register      api/auth/register
	@access public
	*/
function generateOTP() {
	var digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < 4; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}
function addMinutes(date, minutes) {
	return new Date(date.getTime() + minutes * 60000);
}
router.post("/send-otp", (req, res) => {
	const otp = generateOTP();
	const expiry = addMinutes(new Date, 5);
	OTP.findOneAndUpdate({ phone: req.body.phone }, {
		phone: req.body.phone,
		otp,
		expiry,
		updated_on: Date.now()
	}, { new: true, upsert: true }, (err, doc) => {
		if (err) {
			res.status(400).json(err)
		} else {
			fetch(`https://2factor.in/API/V1/f046a3b7-2037-11ec-a13b-0200cd936042/SMS/${req.body.phone.trim()}/${otp}`, { method: "get" })
				.then((res) => res.json())
				.then(async (json) => {
					res.json({ msg: "OTP sent" })
				})
				.catch((err) => {
					res.status(400).json(err)
				});
		}
	})

});
module.exports = router;
