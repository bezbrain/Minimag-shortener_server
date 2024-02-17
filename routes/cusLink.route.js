const express = require("express");
const router = express.Router();

const { customizeUrl } = require("../controllers/cusLink.controller");
const authMiddleware = require("../middleware/auth");

router.post("/customizeUrl", authMiddleware, customizeUrl);

module.exports = router;
