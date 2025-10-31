const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["doctar", "patient"], required: true },
});

module.exports = mongoose.model("User", userSchema);
