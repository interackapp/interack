const express = require("express"),
    router = express.Router(),
    passport = require("passport");

/* Load modules */
const Pin = require("../../../models/pins");
const User = require("../../../models/user");

router.post(
    "/create-pin",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const newPin = new Pin({
                media: req.body.media,
                caption: req.body.caption,
                tags: req.body.tags,
                location: {
                    coordinates : req.body.location,
                    type : "Point"
                },
                address: req.body.address,
                created_by: req.user.id,
                updated_on: Date.now()
            })
            const resp = await newPin.save();
            await User.findOneAndUpdate({ _id: req.user.id }, { $inc: { 'pin_count': 1 } })
            res.json(resp);
        }
        catch (err) {
            console.error(err)
            res.status(400).json(err)
        }
    }
);
module.exports = router;