const express = require("express");
const router = express.Router();

const { createCustomizeUrl } = require("../controllers/cusLink.controller");
const authMiddleware = require("../middleware/auth");
const { redirectLink } = require("../controllers/link.controller");

router.post("/customUrl", authMiddleware, createCustomizeUrl);
router.get("/:shortUrl", redirectLink);

module.exports = router;
