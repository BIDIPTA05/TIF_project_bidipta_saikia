const Community = require("../models/community");
const Member = require("../models/member");

const communityController = {
  createCommunity: async (req, res) => {
    try {
      const { name, slug } = req.body;
      const owner = req.user.userId;
      const existingCommunity = await Community.findOne({ slug });
      if (existingCommunity) {
        return res
          .status(400)
          .json({ error: "Community with this slug already exists" });
      }
      const newCommunity = await Community.create({ name, slug, owner });
      await Member.create({
        community: newCommunity.id,
        user: owner,
        role: "CommunityAdmin",
      });

      res.status(201).json({
        message: "Community created successfully",
        community: newCommunity,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllCommunities: async (req, res) => {
    try {
      const communities = await Community.find();

      res.json({ communities });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllMembers: async (req, res) => {
    const communityId = req.params.id;

    try {
      const members = await Member.find({ community: communityId }).populate(
        "user",
        "name"
      );

      res.json({ members });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getMyOwnedCommunity: async (req, res) => {
    const owner = req.user.userId;

    try {
      const communities = await Community.find({ owner });

      res.json({ communities });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getMyJoinedCommunity: async (req, res) => {
    const member = req.user.userId;

    try {
      const communities = await Member.find({ user: member }).populate(
        "community",
        "name"
      );

      res.json({ communities });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = communityController;
