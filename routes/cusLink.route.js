const express = require("express");
const router = express.Router();

const {
  customizeUrl,
  redirectCusLink,
} = require("../controllers/cusLink.controller");
const authMiddleware = require("../middleware/auth");

router.post("/customizeUrl", authMiddleware, customizeUrl);
router.get("/:customizeUrl", redirectCusLink);

module.exports = router;
