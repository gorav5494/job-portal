const express = require("express");
const { job, Getjob, Getall } = require("../controller/jobsController");

const router = express.Router();

router.route("/addjob").post(job);
router.route("/:_id").get(Getjob);
router.route("/alljobs").get(Getall);

module.exports = router;
