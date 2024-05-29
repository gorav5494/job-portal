const express = require("express");
const { job, Getjob, GetAllJobs } = require("../controller/jobsController");

const router = express.Router();

router.route("/addjob").post(job);
router.route("/:_id").get(Getjob);
router.route("/").get(GetAllJobs);

module.exports = router;
