const Role = require("../models/role");

const roleController = {
  createRole: async (req, res) => {
    try {
      const { name } = req.body;

      // Check if the role name is already taken
      const existingRole = await Role.findOne({ name });
      if (existingRole) {
        return res.status(400).json({ error: "Role name is already taken" });
      }

      // Creating a new role
      const newRole = await Role.create({ name });

      res
        .status(201)
        .json({ message: "Role created successfully", role: newRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.find();

      res.json({ roles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = roleController;
