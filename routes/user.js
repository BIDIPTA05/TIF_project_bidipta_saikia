const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authenticateJWT");

const router = express.Router();

// Sign up a new user
router.post("/auth/signup", userController.signup);

// Sign in an existing user
router.post("/auth/signin", userController.signin);

// Get user information
router.get("/auth/me", authenticateToken, userController.getMe);

module.exports = router;
