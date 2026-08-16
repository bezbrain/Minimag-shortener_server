import express from "express";
import {
  getAllShortDemoLinks,
  getAllCusDemoLinks,
} from "../../controllers/demo/demoDetails.cont";

const router = express.Router();

router.get("/allDemoShortUrl/:demoUserID", getAllShortDemoLinks);
router.get("/allDemoCusUrl/:demoUserID", getAllCusDemoLinks);

export default router;
