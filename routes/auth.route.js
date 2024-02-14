const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  logout,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", authMiddleware, logout);

module.exports = router;
