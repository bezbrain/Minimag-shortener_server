const express = require("express");
const router = express.Router();

const { createLink, redirectLink } = require("../controllers/link.controller");

router.post("/createUrl", createLink);
router.get("/redirectUrl/:redirectID", redirectLink);

module.exports = router;
