const router = require("express").Router();
const ftpController = require("../../../controllers/ftpController");
const multer  = require('multer')
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

router.post("/listdir", upload.any(), function(req, res){
    // console.log(req.files[0]);
    ftpController.listDir(req.files[0]);
});

module.exports = router;
