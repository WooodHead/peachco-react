const router = require("express").Router();
const ebayController = require("../../../controllers/ebayController");
// Matches with "/api/database/:id"

router.route("/getcat").post(ebayController.getCategories);

router.route("/additem").post(ebayController.addItem);


module.exports = router;
