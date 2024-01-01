const express = require("express");
const memberController = require("../controllers/memberController");
const { authenticateToken } = require("../middlewares/authenticateJWT");

const router = express.Router();

// Add a member to a community
router.post("/member", authenticateToken, memberController.addMember);

// Remove a member from a community
router.delete("/member/:id", authenticateToken, memberController.removeMember);

module.exports = router;
