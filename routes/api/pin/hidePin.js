const express = require("express"),
    router = express.Router(),
    passport = require("passport");

/* Load modules */
const Pin = require("../../../models/pins");

router.post(
    "/hide-pin",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            Pin.findOneAndUpdate({
                _id: req.body.id
            }, {
                $set: {
                    visible: req.body.visible
                }
            }, { new: true }, (err, docs) => {
                if (err) {
                    res.status(400).json(err);
                    return;
                }
                res.json(docs);
            })
        }
        catch (err) {
            console.error(err)
            res.status(400).json(err)
        }
    }
);
module.exports = router;