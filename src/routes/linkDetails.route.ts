import express from "express";
import {
  getAllShortLinks,
  getAllCustomLinks,
  deleteShortLink,
  deleteCustomLink,
} from "../controllers/linkDetails.controller";

const router = express.Router();

router.get("/allLinks", getAllShortLinks);
router.get("/allCusLinks", getAllCustomLinks);
router.delete("/singleLink/:urlID", deleteShortLink);
router.delete("/singleCusLink/:urlID", deleteCustomLink);

export default router;
