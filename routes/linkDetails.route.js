const express = require("express");
const router = express.Router();

const {
  getAllShortLinks,
  getAllCustomLinks,
} = require("../controllers/linkDetails.controller");

router.get("/allLinks", getAllShortLinks);
router.get("/allCusLinks", getAllCustomLinks);

module.exports = router;
