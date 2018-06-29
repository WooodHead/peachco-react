const router = require("express").Router();
const dbController = require("../../../controllers/dbController");
// Matches with "/api/database/:id"

// router
//   .route("/item/:id")
//   .get(dbController.findById);

// router
//   .route("/item/:id/:match")
//   .get(dbController.findByIdPartial);

// router
//   .route("/item/new")
//   .get(dbController.newTemplate);

router
  .route("/item/:type")
  .get(dbController.getAttributes);

router
.route("/item/:type/:id")
.get(dbController.getAttributes);

router
  .route("/:searchTerm")
  .get(dbController.findByQuery);

router
  .route("/shipping/templates/")
  .get(dbController.getShippingTemplates);

router
  .route("/item/update/:id")
  .post(dbController.updateItem);




module.exports = router;
