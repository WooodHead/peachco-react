const router = require("express").Router();
const ebayRoutes = require("./ebay/ebay");
const db = require("./db/db");
//const barcode = require("./barcode");

router.use("/db", db);
router.use("/ebay", ebayRoutes);
//router.use("/barcode", barcode);

module.exports = router;
