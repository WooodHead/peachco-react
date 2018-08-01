const router = require("express").Router();
const ftpController = require("../../../controllers/ftpController");
const multer  = require('multer')
let storage = multer.memoryStorage();
let upload = multer({ storage: storage })

router
    .route("/listdir")
    .post(upload.any(), function(req, res){
    ftpController.listDir(req, res);
});

module.exports = router;
