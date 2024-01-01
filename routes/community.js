const express = require("express");
const communityController = require("../controllers/communityController");
const { authenticateToken } = require("../middlewares/authenticateJWT");

const router = express.Router();

// Creating a new community
router.post(
  "/community",
  authenticateToken,
  communityController.createCommunity
);

// Get all communities
router.get("/community", communityController.getAllCommunities);

// Get all members of a community
router.get(
  "/community/:id/members",
  authenticateToken,
  communityController.getAllMembers
);

// Get communities owned by the authenticated user
router.get(
  "/community/me/owner",
  authenticateToken,
  communityController.getMyOwnedCommunity
);

// Get communities joined by the authenticated user
router.get(
  "/community/me/member",
  authenticateToken,
  communityController.getMyJoinedCommunity
);

module.exports = router;
