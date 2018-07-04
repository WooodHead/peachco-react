const router = require("express").Router();
const barcodeController = require("../../../controllers/barcodeController");
const multer  = require('multer')
let storage = multer.memoryStorage();
let upload = multer({ storage: storage })
// Matches with "/api/database/:id"

router.post("/scan", upload.single("barcode"), function(req, res){
    console.log(req.file.buffer);
    barcodeController.decode(req.file.buffer);
});

module.exports = router;
