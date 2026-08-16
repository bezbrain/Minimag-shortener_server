import express from "express";
import {
  firebaseAnalytics,
  customEventsAnalytics,
} from "../controllers/analytics.controller";

const router = express.Router();

router.get("/analytics", firebaseAnalytics);
router.get("/customAnalytics", customEventsAnalytics);

export default router;
