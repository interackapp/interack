const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  keys = require("../../../config/keys");
/* Load user module */
const User = require("../../../models/user");

router.get(
  "/email-confirmation/:token",
  async (req, res) => {
    const {token} = req.params;
    jwt.verify(token,keys.secretOrKey,async function(err,decodeToken){
        if(err){
            res.status(400).send("Invalid request")
        }
        const {email,id} = decodeToken;
        User.findOneAndUpdate({ email }, {verified: true}, {upsert: true, new: true}, (err, doc)=>{
            if(err){
                res.status(400).send("Invalid request")
            }else{
                res.render("emailConfirmSuccess", {
                    message:
                      "Your account has been successfully verified.",
                    // loginUrl: base.externalUrl + "login",
                    success: true
                  });
            }
        })
    })
  }
);

module.exports = router;
