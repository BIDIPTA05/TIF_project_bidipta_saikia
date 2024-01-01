const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Snowflake = require("@theinternetfolks/snowflake");

const userSchema = new Schema({
  id: {
    type: String,
    default: Snowflake.generate,
  },
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  created_at: { type: Date, default: Date.now },
});

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
