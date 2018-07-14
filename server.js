const express = require("express");
const session = require('express-session');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const path = require("path");

const db = require("./models");
const routes = require("./routes");

let PORT = process.env.PORT || 3001;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// We need to use sessions to keep track of our user's login status
app.use(require("connect-multiparty")());
app.use(cookieParser());
app.use(session({secret: "super-secret"}));

app.use(passport.initialize());
app.use(passport.session());

// Set up passport to authenticate

passport.use(db.users.createStrategy());

passport.serializeUser(db.users.serializeUser());
passport.deserializeUser(db.users.deserializeUser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("Listening to port %s", PORT);
  });
});