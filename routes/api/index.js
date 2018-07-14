const router = require("express").Router();

const barcode = require("./barcode/barcode");
const db = require("./db/db");
const ebayRoutes = require("./ebay/ebay");
const ftp = require("./ftp/ftp");
const users = require("./users/users")

router.use("/barcode", barcode);
router.use("/db", db);
router.use("/ebay", ebayRoutes);
router.use("/ftp", ftp);
router.use("/users", users);

module.exports = router;
