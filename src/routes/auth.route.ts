import express from "express";
import {
  loginUser,
  registerUser,
  logout,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", authMiddleware, logout);

export default router;
