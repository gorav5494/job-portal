const express = require("express");
const {
  job,
  Getjob,
  GetAllJobs,
  DeleteJob,
  updatejob,
  // searchJob,
} = require("../controller/jobsController");

const router = express.Router();

router.route("/addjob").post(job);
router.route("/:id").get(Getjob);
router.route("/").get(GetAllJobs);
router.route("/:id").put(updatejob);
router.route("/:id").delete(DeleteJob);

// router.route("/").get(searchJob);

module.exports = router;
