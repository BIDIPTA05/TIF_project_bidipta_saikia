const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  id: { type: String, default: snowflake.generate },
  name: { type: String },
  slug: { type: String, unique: true },
  owner: { type: String, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Community", communitySchema);
