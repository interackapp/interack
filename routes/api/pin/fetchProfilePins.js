const express = require("express"),
    router = express.Router(),
    passport = require("passport");

/* Load modules */
const Pin = require("../../../models/pins");

router.get(
    "/fetch-profile-pins",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const pins = await Pin.find({
                created_by: req.query.user_id,
                active: true
            })
            res.json(pins);
        }
        catch (err) {
            console.error(err)
            res.status(400).json(err)
        }
    }
);
module.exports = router;