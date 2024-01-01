const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  id: { type: String, default: snowflake.generate },
  community: { type: String, ref: "Community" },
  user: { type: String, ref: "User" },
  role: { type: String, ref: "Role" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Member", memberSchema);
