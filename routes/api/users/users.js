const router = require("express").Router();
const usersController = require("../../../controllers/usersController");
const passport = require('../../../config/passport');

router
    .route("/login/")
    .post(passport.authenticate("local"), function(req, res){
        usersController.login(req, res);
    })
    .get(function(req, res) {
        if (req.user) {
          res.json({isLoggedIn: true, username: req.user.username})
        } else {
            res.json({isLoggedIn: false})
        }
    }) 

router 
    .route("/logout/")
    .get(function(req, res){
        usersController.logout(req, res);
    })

module.exports = router;