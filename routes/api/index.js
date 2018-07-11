const router = require("express").Router();
const ebayRoutes = require("./ebay/ebay");
const db = require("./db/db");
const barcode = require("./barcode/barcode");
const ftp = require("./ftp/ftp");

router.use("/db", db);
router.use("/ebay", ebayRoutes);
router.use("/barcode", barcode);
router.use("/ftp", ftp);

module.exports = router;
