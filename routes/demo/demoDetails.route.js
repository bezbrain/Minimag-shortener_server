const express = require("express");
const router = express.Router();

const {
  getAllShortDemoLinks,
  getAllCusDemoLinks,
} = require("../../controllers/demo/demoDetails.cont");

router.get("/allDemoShortUrl/:demoUserID", getAllShortDemoLinks);
router.get("/allDemoCusUrl/:demoUserID", getAllCusDemoLinks);

module.exports = router;
