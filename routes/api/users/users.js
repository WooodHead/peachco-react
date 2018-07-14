const router = require("express").Router();
const usersController = require("../../../controllers/usersController");
const passport = require('../../../config/passport');

router
    .route("/register/")
    .post(usersController.register);

router
    .post("/login/", passport.authenticate("local"), function(req, res){
        usersController.login(req, res);
    });

module.exports = router;