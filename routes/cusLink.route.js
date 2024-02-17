const express = require("express");
const router = express.Router();

const {
  customizeUrl,
  redirectCusLink,
} = require("../controllers/cusLink.controller");
const authMiddleware = require("../middleware/auth");
const { redirectLink } = require("../controllers/link.controller");

router.post("/customizeUrl", authMiddleware, customizeUrl);
router.get("/:shortUrl", redirectLink);

module.exports = router;
