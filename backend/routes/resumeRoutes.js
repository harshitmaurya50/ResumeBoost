const express = require("express");
const router = express.Router();
const { uploadResumePDF, getUserResumes,compareMultipleResumes, checkATSScore, } = require("../controllers/resumeController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
// const upload = require("../middleware/upload");


router.post("/upload", protect, upload.single("resume"), uploadResumePDF);
router.get("/user", protect, getUserResumes);
router.post("/compare-multiple",protect , compareMultipleResumes);
router.post("/check-ats-score", checkATSScore);
// router.post("/upload", protect, upload.single("resume"), uploadResume);



module.exports = router;
