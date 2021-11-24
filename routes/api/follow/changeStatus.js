const express = require("express"),
	router = express.Router(),
	passport = require("passport");

/* Load modules */
const Follow = require("../../../models/follows");
const User = require("../../../models/user");

router.post(
	"/change-status",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			Follow.findOneAndUpdate({_id:req.body.id}, {
                $set:{
                    status: req.body.status
                }
            }, {
                new: true
            }, async(err, docs)=>{
                if(err){
                    res.status(400).json(err)
                    return;
                }
				if(req.body.status === "connected"){
					await User.findOneAndUpdate({
						_id :req.user.id
					}, {
						$inc : {'follower_count' : 1
					}})
				}
                res.json(docs)
            })
		}
		catch (err) {
			console.error(err)
			res.status(400).json(err)
		}
	}
);
module.exports = router;