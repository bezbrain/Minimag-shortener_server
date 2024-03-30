const express = require("express");
const router = express.Router();

const {
  createDemoCustomizeUrl,
} = require("../../controllers/demo/cusLink.cont");
const { redirectLink } = require("../../controllers/link.controller");

router.post("/customDemoUrl", createDemoCustomizeUrl);
router.get("/:shortUrl", redirectLink);

module.exports = router;
