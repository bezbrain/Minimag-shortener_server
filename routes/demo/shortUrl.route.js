const express = require("express");
const router = express.Router();

const { createShortUrl } = require("../../controllers/demo/shortLink.cont");
const { redirectLink } = require("../../controllers/link.controller");

router.post("/createDemo", createShortUrl);
router.get("/:shortUrl", redirectLink);

module.exports = router;
