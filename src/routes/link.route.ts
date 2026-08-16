import express from "express";
import { createLink, redirectLink } from "../controllers/link.controller";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/createUrl", authMiddleware, createLink);
router.get("/:shortUrl", redirectLink);

export default router;
