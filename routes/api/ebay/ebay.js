const router = require("express").Router();
const ebayController = require("../../../controllers/ebayController");

router.route("/getcategories").post(ebayController.getCategories);

router.route("/additem").post(ebayController.addItem);


module.exports = router;
