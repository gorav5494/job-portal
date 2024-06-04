const express = require("express");
const applicationfill = require("../controller/applyJobController");
const multer = require("multer");

const router = express.Router();

// set up for Multer storage cofiguration

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

// file upload size configuration

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: fileFilter,
});

router.post("/apply", upload.single("file"), applicationfill);

// router.route("/fillform").post(applicationfill);
// router.route("/updatedetails").post(uploadFile);
// router.route("/viewdetails").get(applicationfill);

module.exports = router;
