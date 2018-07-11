const router = require("express").Router();
const ftpController = require("../../../controllers/ftpController");
const multer  = require('multer')
let storage = multer.memoryStorage();
let upload = multer({ storage: storage })
// Matches with "/api/database/:id"

router.post("/listdir", upload.single("image"), function(req, res){
    console.log(req.file);
    ftpController.listDir(req.file);
});

module.exports = router;
