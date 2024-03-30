const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectDemoLink,
} = require("../../controllers/demo/shortLink.cont");

router.post("/createDemo", createShortUrl);
router.get("/shortUrl", redirectDemoLink);

module.exports = router;
