const express = require("express");
const applicationfill = require("../controller/applyJobController");

const router = express.Router();

router.route("/fillform").post(applicationfill);

module.exports = router;
