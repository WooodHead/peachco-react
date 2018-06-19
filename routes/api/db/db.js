const router = require("express").Router();
const dbController = require("../../../controllers/dbController");
// Matches with "/api/database/:id"

router.route("/item/:id").get(dbController.findById);

router
  .route("/:searchTerm")
  .get(dbController.findByQuery);


module.exports = router;
