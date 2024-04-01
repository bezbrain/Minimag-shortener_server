const express = require("express");
const router = express.Router();

const {
  getAllShortDemoLinks,
} = require("../../controllers/demo/demoDetails.cont");

router.get("/allDemoShortUrl/:demoUserID", getAllShortDemoLinks);

module.exports = router;
