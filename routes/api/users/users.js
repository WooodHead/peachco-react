const router = require("express").Router();
const usersController = require("../../../controllers/usersController");

router
    .route("/register/")
    .post(usersController.register);

module.exports = router;