const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  mime = require('mime'),
  fs = require('fs');

/* Load modules */
const User = require("../../../models/user");

/* 
  @route Post:/change-avatar
  @access private
  @desc - Upload photo
*/
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};
  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');
  return response;
}
router.post(
  "/change-avatar",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var decodedImg = decodeBase64Image(req.body.photo);
    var imageBuffer = decodedImg.data;
    var type = decodedImg.type;
    var extension = mime.getExtension(type);
    var fileName =  `image-${Date.now()}.` + extension;
    try{
      fs.writeFileSync("uploads/" + fileName, imageBuffer, 'utf8');
      User.findOneAndUpdate({_id: req.user.id}, {avatar: fileName}, {new: true}, (err, docs)=>{
        if(err){
          res.status(400).json(err)
        }else{
          res.json(docs)
        }
      })
    }
    catch(err){
      console.error(err)
      res.status(400).json(err)
    }
  }
);
module.exports = router;