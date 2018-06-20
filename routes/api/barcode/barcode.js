const router = require("express").Router();
const barcodeController = require("../../../controllers/barcodeController");
const multer  = require('multer')
let storage = multer.memoryStorage();
let upload = multer({ storage: storage })
// Matches with "/api/database/:id"

router.route("/scan").post(upload.single("test")).post(barcodeController.decode);

module.exports = router;
