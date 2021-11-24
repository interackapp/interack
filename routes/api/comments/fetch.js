const express = require("express"),
    router = express.Router(),
    passport = require("passport");

/* Load modules */
const Comment = require("../../../models/comments");
router.get(
    "/fetch",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const comments = await Comment.find({
                pin_id: req.query.pin_id
            }).populate("created_by")
            res.json(comments);
        }
        catch (err) {
            console.error(err)
            res.status(400).json(err)
        }
    }
);
module.exports = router;