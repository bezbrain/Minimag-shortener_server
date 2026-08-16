import express from "express";
import { createDemoCustomizeUrl } from "../../controllers/demo/cusLink.cont";
import { redirectLink } from "../../controllers/link.controller";

const router = express.Router();

router.post("/customDemoUrl", createDemoCustomizeUrl);
router.get("/:shortUrl", redirectLink);

export default router;
