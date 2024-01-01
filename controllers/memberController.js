const Member = require("../models/member");
const User = require("../models/user");
const Community = require("../models/community");
const Role = require("../models/role");

const memberController = {
  addMember: async (req, res) => {
    try {
      const { communityId, userId, role } = req.body;

      // Check if the community exists
      const existingCommunity = await Community.findById(communityId);
      if (!existingCommunity) {
        return res.status(404).json({ error: "Community not found" });
      }

      // Check if the user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the role exists
      const existingRole = await Role.findOne({ name: role });
      if (!existingRole) {
        return res.status(404).json({ error: "Role not found" });
      }

      // Check if the member already exists
      const existingMember = await Member.findOne({
        community: communityId,
        user: userId,
      });
      if (existingMember) {
        return res
          .status(400)
          .json({ error: "User is already a member of the community" });
      }

      // Creating a new member
      const newMember = await Member.create({
        community: communityId,
        user: userId,
        role: existingRole.id,
      });

      res
        .status(201)
        .json({ message: "Member added successfully", member: newMember });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  removeMember: async (req, res) => {
    const memberId = req.params.id;

    try {
      // Check if the member exists
      const existingMember = await Member.findById(memberId);
      if (!existingMember) {
        return res.status(404).json({ error: "Member not found" });
      }

      // Remove the member
      await Member.findByIdAndDelete(memberId);

      res.json({ message: "Member removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = memberController;
