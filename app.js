var createError = require("http-errors");
var express = require("express");
// var favicon = require('serve-favicon');
var path = require("path");
var cookieParser = require("cookie-parser");
// For Command Line Prompts
var logger = require("morgan");
// for Sass
var sassMiddleware = require("node-sass-middleware");
//  for cors error handling
var cors = require("cors");
// Passport for jwt
var passport = require("passport");
// Exporting Express as app
var app = express();

/* ============================================================== */
// view engine setup
// app.use(express.favicon(__dirname + '/public/images/logo-m.png')); 
app.use(express.json({limit: '40mb'}));
app.use(express.urlencoded({limit: '40mb'}));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/templates", express.static(__dirname + "/templates"));
app.use('/favicon.ico', express.static('images/logo-m.png'));
/* ============================================================== */
/* db connection */
const mongoose = require("mongoose"),
  db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true })
  .then(console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* ============================================================== */
/* passport config */
require("./config/passport")(passport);

/* ============================================================== */
// Include Required Routes
var indexRouter = require("./routes/index");
var profileRouter = require("./routes/profile");

// Auth
const register = require("./routes/api/auth/register"),
  login = require("./routes/api/auth/login"),
  emailConfirmation = require("./routes/api/auth/emailConfirmation"),
  sendOTP = require("./routes/api/auth/sendOTP"),
  verifyOTP = require("./routes/api/auth/verifyOTP"),
  changePassword = require("./routes/api/auth/changePassword"),
  googleSignin = require("./routes/api/auth/googleSignin"),
  facebookSignin = require("./routes/api/auth/facebookSignin"),
  checkUsername = require("./routes/api/auth/checkUsername");

//Profile
const fetchProfile = require('./routes/api/profile/fetch'),
  editProfile = require('./routes/api/profile/editProfile'),
  changeAvatar = require('./routes/api/profile/changeAvatar'),
  fetchPublicProfile = require('./routes/api/profile/fetchPublic'),
  addSocialProfile = require('./routes/api/profile/addSocialProfile'),
  togglePrivateProfile = require('./routes/api/profile/togglePrivateProfile'),
  updateLocation = require('./routes/api/profile/updateLocation');

//Search
const searchNearby = require('./routes/api/search/searchNearby'),
  toggleVisible = require('./routes/api/search/toggleVisible');

//Follow
const createFollower = require('./routes/api/follow/createFollower'),
  fetchFollowers = require('./routes/api/follow/fetchFollowers'),
  changeFollowStatus = require('./routes/api/follow/changeStatus');

//Notification
const fetchFollowRequests = require('./routes/api/notification/fetchFollowRequests');

//Pins
const createPin = require('./routes/api/pin/createPin'),
  fetchProfilePins = require('./routes/api/pin/fetchProfilePins'),
  fetchPins = require('./routes/api/pin/fetchPins'),
  hidePin = require('./routes/api/pin/hidePin');

//Likes
const toggleLike = require('./routes/api/likes/toggleLike');

//Comments
const createComment = require('./routes/api/comments/create'),
  fetchComments = require('./routes/api/comments/fetch');

// use routes
app.use("/", indexRouter);
app.use("/profile", profileRouter);
//Auth
app.use("/api/auth", register);
app.use("/api/auth", login);
app.use("/", emailConfirmation);
app.use("/api/auth", sendOTP);
app.use("/api/auth", verifyOTP);
app.use("/api/auth", changePassword);
app.use("/api/auth", googleSignin);
app.use("/api/auth", facebookSignin);
app.use("/api/auth", checkUsername);
//Profile
app.use("/api/profile", fetchProfile);
app.use("/api/profile", editProfile);
app.use("/api/profile", changeAvatar);
app.use("/api/profile", fetchPublicProfile);
app.use("/api/profile", addSocialProfile);
app.use("/api/profile", togglePrivateProfile);
app.use("/api/profile", updateLocation);
//Search
app.use("/api/search", searchNearby);
app.use("/api/search", toggleVisible);
//Follow
app.use("/api/follow", createFollower);
app.use("/api/follow", fetchFollowers);
app.use('/api/follow', changeFollowStatus)
//Notification
app.use("/api/notification", fetchFollowRequests);
//Pin
app.use("/api/pins", createPin);
app.use("/api/pins", fetchProfilePins);
app.use("/api/pins", fetchPins);
app.use("/api/pins", hidePin);
//Like
app.use("/api/likes", toggleLike);
//Comments
app.use("/api/comments", createComment);
app.use("/api/comments", fetchComments);

/* ============================================================== */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* ============================================================== */
app.options("*", cors());
module.exports = app;
