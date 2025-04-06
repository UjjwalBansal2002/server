const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
});

module.exports = mongoose.model("Admin", adminSchema);
