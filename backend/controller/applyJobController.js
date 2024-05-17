const AppliedJob = require("../Models/applyJobs");
const asynchandler = require("express-async-handler");

const applicationfill = asynchandler(async (req, res) => {
  const { user, job, name, email, about, resume, status } = req.body;

  const applicationfill = await AppliedJob.create({
    user,
    job,
    name,
    email,
    about,
    resume,
    status,
  });
  console.log("dkf", req.body);
  if (applicationfill) {
    res.status(201).json({
      message: "Application Submit SucessFully",
      data: applicationfill,
    });
  } else {
    res.status(400);
    throw new Error("Submit  Occured.. !");
  }
});

module.exports = applicationfill;
