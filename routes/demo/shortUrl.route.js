const express = require("express");
const router = express.Router();

const { createShortUrl } = require("../../controllers/demo/shortLink.cont");

router.post("/createDemo", createShortUrl);

module.exports = router;
