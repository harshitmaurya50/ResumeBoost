// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // ✅ must match your error path
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + file.originalname.replace(/\s/g, "");
//     cb(null, uniqueSuffix);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
