const express = require("express");
const applicationfill = require("../controller/applyJobController");
const upload = require("../Middleware/multer");

const router = express.Router();

router.route("/apply").post(upload.single("file"), applicationfill);

module.exports = router;
