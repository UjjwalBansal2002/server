const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: String,
  course: String,
  subject: String,
  type: String, // "Notes", "Syllabus", "Previous Year Paper"
  year: String,
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Material", materialSchema);
