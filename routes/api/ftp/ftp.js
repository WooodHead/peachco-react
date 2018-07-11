const router = require("express").Router();
const ftpController = require("../../../controllers/ftpController");

router.route("/listdir").get(ftpController.listDir);

module.exports = router;