const express = require("express");
const router = express.Router();

const { firebaseAnalytics } = require("../controllers/analytics.controller");

router.get("/analytics", firebaseAnalytics);

module.exports = router;
