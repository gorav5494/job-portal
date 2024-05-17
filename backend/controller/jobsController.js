const Job = require("../Models/jobs");
const asynchandler = require("express-async-handler");

const job = asynchandler(async (req, res) => {
  const {
    user,
    title,
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
    title,
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
  const job = await Job.findById(req.params._id);

  //   console.log(job);

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

module.exports = { job, Getjob };
