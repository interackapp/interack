const express = require("express"),
    router = express.Router(),
    passport = require("passport");

/* Load modules */
const Comment = require("../../../models/comments");
const Pin = require("../../../models/pins");

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const newComment = new Comment({
                pin_id: req.body.pin_id,
                comment: req.body.comment,
                created_by: req.user.id,
                updated_on: Date.now()
            })
            const resp = await newComment.save();
            await Pin.findOneAndUpdate({ _id: req.body.pin_id }, { $inc: { 'comment_count': 1 } });
            res.json(resp);
        }
        catch (err) {
            console.error(err)
            res.status(400).json(err)
        }
    }
);
module.exports = router;