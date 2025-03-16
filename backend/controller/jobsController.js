const Job = require("../Models/jobs");
const asynchandler = require("express-async-handler");
const ApiFeatures = require("../utils/apifeature");

const job = asynchandler(async (req, res) => {
  const {
    user,
    job_title,
    description,
    salary,
    company,
    email,
    job_category,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  } = req.body;

  // console.log("this job", req.body);
  const newjob = await Job.create({
    user,
    job_title,
    description,
    salary,
    company,
    email,
    job_category,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  });
  // console.log("this job", newjob);
  if (newjob) {
    res.status(201).json({
      message: "Job Added SucessFully yahooo...",
      data: newjob,
    });
  } else {
    res.status(400);
    throw new Error("error  Occured.. !");
  }
});

// Get job Details

const Getjob = asynchandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  // const jobdata = res.json();
  // console.log("dss", jobdata);

  if (job) {
    res.status(200).json({
      message: "job Found...",
      data: job,
    });
  } else {
    res.status(400).json({
      message: "job Is not Found",
    });
  }
});

/* Get All jobs */

const GetAllJobs = asynchandler(async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    success: true,
    jobs,
  });
});

/* Update Jobs */

const updatejob = asynchandler(async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* Delete Jobs */

const DeleteJob = asynchandler(async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { job, Getjob, GetAllJobs, updatejob, DeleteJob };
