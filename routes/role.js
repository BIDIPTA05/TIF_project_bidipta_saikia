const express = require("express");
const roleController = require("../controllers/roleController");

const router = express.Router();

// Create a new role
router.post("/role", roleController.createRole);

// Get all roles
router.get("/role", roleController.getAllRoles);

module.exports = router;
