const express = require("express");
const router = express.Router();

const { createLink, redirectLink } = require("../controllers/link.controller");
const authMiddleware = require("../middleware/auth");

router.post("/createUrl", authMiddleware, createLink);
router.get("/redirectUrl/:shortUrl", redirectLink);

module.exports = router;
