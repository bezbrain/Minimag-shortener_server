import express from "express";
import { createShortUrl } from "../../controllers/demo/shortLink.cont";
import { redirectLink } from "../../controllers/link.controller";

const router = express.Router();

router.post("/createDemo", createShortUrl);
router.get("/:shortUrl", redirectLink);

export default router;
