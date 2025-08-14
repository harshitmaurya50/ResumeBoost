const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
