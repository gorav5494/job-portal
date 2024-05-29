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
  const jobdata = res.json();
  console.log("dss", jobdata);

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

//get all listing page

const GetAllJobs = asynchandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    if (jobs.length > 0) {
      res.status(200).json({ message: "Jobs found", data: jobs });
    } else {
      res.status(404).json({ message: "No jobs found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); */

module.exports = { job, Getjob, GetAllJobs };
