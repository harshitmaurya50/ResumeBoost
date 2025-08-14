const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String, // e.g., "Amazon SDE Resume"
  resumeText: String,
   fileUrl: String,
   jobDescription: String,
  comparisonMatchReport: Object,
    matchReport: String,
  // analysis: String, // markdown output from Gemini
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobMatch" }],
  fileData: Buffer,
  contentType: String
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
