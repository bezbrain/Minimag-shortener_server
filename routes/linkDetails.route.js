const express = require("express");
const router = express.Router();

const {
  getAllShortLinks,
  getAllCustomLinks,
  deleteShortLink,
  deleteCustomLink,
} = require("../controllers/linkDetails.controller");

router.get("/allLinks", getAllShortLinks);
router.get("/allCusLinks", getAllCustomLinks);
router.delete("/singleLink/:urlID", deleteShortLink);
router.delete("/singleCusLink/:urlID", deleteCustomLink);

module.exports = router;
