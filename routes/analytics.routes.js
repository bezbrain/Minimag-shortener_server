const express = require("express");
const router = express.Router();

const {
  firebaseAnalytics,
  customEventsAnalytics,
} = require("../controllers/analytics.controller");

router.get("/analytics", firebaseAnalytics);
router.get("/customAnalytics", customEventsAnalytics);

module.exports = router;
