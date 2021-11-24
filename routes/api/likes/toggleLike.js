const express = require("express"),
    router = express.Router(),
    passport = require("passport");

/* Load modules */
const Like = require("../../../models/likes");
const Pin = require("../../../models/pins");

router.post(
    "/toggle-like",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const likeResp = await Like.findOne({
                created_by: req.user.id,
                pin_id: req.body.pin_id
            })
            if(likeResp){
                Like.deleteOne({ _id: likeResp._id }, async function (err) {
                    await Pin.findOneAndUpdate({ _id: req.body.pin_id }, 
                        { $inc: { 'like_count': -1 },
                        $pull: {
                            like_user_ids: { $in: req.user.id }
                        },
                    })
                    res.json({msg: "Unliked"});
                })
            }else{
                const newLike = new Like({
                    created_by: req.user.id,
                    pin_id: req.body.pin_id,
                    updated_on: Date.now()
                });
                await newLike.save();
                await Pin.findOneAndUpdate({ _id: req.body.pin_id }, { 
                    $inc: { 'like_count': 1 },
                    $addToSet: {
                        like_user_ids: req.user.id
                    }
                })
                res.json(newLike);
            }
        }
        catch (err) {
            console.error(err)
            res.status(400).json(err)
        }
    }
);
module.exports = router;