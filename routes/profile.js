var express = require('express');
var router = express.Router();

/* Load user module */
const User = require("../models/user");

// load utils
const getLink = require("../utils/getLink");

const base = require("../config/base");

/* GET profile. */
router.get('/:id', async function(req, res) {
  const {id} = req.params;
  const user = await User.findOne({ _id: id });
  if(user){
    let miidirect = user.cards.filter(card => card.isMiiDirectOn);
    if(miidirect.length && user.active){
      let link = getLink(miidirect[0].value, miidirect[0].tag.split("_")[0]);
      res.status(301).redirect(link)
    }else{
      res.render("profile", {title: `${user.first_name} ${user.last_name} | miitap`, user, base})
    }
  }else{
    res.render("index", {title: "Miitap Profile"})
  }
});

module.exports = router;
