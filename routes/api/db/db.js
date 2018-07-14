const router = require("express").Router();
const dbController = require("../../../controllers/dbController");

router
  .route("/item/:type")
  .get(dbController.getAttributes);
router
  .route("/item/:type/:id")
  .get(dbController.getAttributes);

router
  .route("/item")
  .post(dbController.addToDatabase);

router
  .route("/:searchTerm")
  .get(dbController.findByQuery);

router
  .route("/shipping/templates/")
  .get(dbController.getShippingTemplates);

router
  // .route("/item/update/:id")
  .post("/item/update/:id", function(req, res){
      dbController.updateItem(req, res);
  });




module.exports = router;
