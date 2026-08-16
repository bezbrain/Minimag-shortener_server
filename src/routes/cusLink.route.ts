import express from "express";
import { createCustomizeUrl } from "../controllers/cusLink.controller";
import authMiddleware from "../middleware/auth";
import { redirectLink } from "../controllers/link.controller";

const router = express.Router();

router.post("/customUrl", authMiddleware, createCustomizeUrl);
router.get("/:shortUrl", redirectLink);

export default router;
