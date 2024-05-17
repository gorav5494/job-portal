const express = require("express");
const { job, Getjob } = require("../controller/jobsController");

const router = express.Router();

router.route("/addjob").post(job);
router.route("/:_id").get(Getjob);

module.exports = router;
