const Resume = require("../models/Resume");
const JobMatch = require("../models/JobMatch");

exports.matchResumeToJobDescription = async (req, res) => {
  const { resumeId, jobTitle, company, jobDescription } = req.body;

  if (!resumeId || !jobDescription) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    const matchReport = await matchResumeToJob(resume.resumeText, jobDescription);

    const newMatch = await JobMatch.create({
      resume: resumeId,
      jobTitle,
      company,
      jobDescription,
       matchReport: JSON.stringify(matchData),
    });

    // Optional: Push to resume.matches[]
    resume.matches.push(newMatch._id);
    await resume.save();

    res.status(201).json({ matchData, saved: newMatch });
  } catch (error) {
    console.error("Job Match Error:", error.message);
    res.status(500).json({ msg: "Failed to match and save job match" });
  }
};
