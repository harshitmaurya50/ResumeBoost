const mongoose = require("mongoose");

const jobMatchSchema = new mongoose.Schema({
  resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
  jobTitle: String,
  company: String,
  jobDescription: String,
  matchReport: String // Gemini response
}, { timestamps: true });

module.exports = mongoose.model("JobMatch", jobMatchSchema);
