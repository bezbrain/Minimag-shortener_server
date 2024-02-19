const express = require("express");
const router = express.Router();

const { getAllLinks } = require("../controllers/linkDetails.controller");

router.get("/allLinks", getAllLinks);

module.exports = router;
