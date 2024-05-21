const express = require("express");
const applicationfill = require("../controller/applyJobController");

const router = express.Router();

router.route("/fillform").post(applicationfill);
// router.route("/updatedetails").post(applicationfill);
// router.route("/viewdetails").get(applicationfill);

module.exports = router;
