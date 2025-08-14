const express = require("express");
const { matchResumeToJobDescription } = require("../controllers/jobController");

const router = express.Router();

router.post("/match", matchResumeToJobDescription); // POST /api/job/match

module.exports = router;
