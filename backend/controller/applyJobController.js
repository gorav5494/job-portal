const AppliedJob = require("../Models/applyJobs");
const asynchandler = require("express-async-handler");
// const path = require("path");

const applicationfill = asynchandler(async (req, res) => {
  const { user, job, name, email, about } = req.body;
  const cv = req.file ? req.file.filename : "";

  const applydata = await AppliedJob.create({
    user,
    job,
    name,
    email,
    about,
    cv,
  });

  applydata
    .save()
    .then((result) => {
      res.status(201).json({
        message: "File uploaded successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error saving document",
        error: err,
      });
    });
});

//get the users

const getapplyUsers = asynchandler(async (req, res) => {
  const applyjob = await AppliedJob.findById(req.params.id);
  if (applyjob) {
    res.status(200).json({
      message: "applyjob Found...",
      data: applyjob,
    });
  } else {
    res.status(400).json({
      message: "applyjob Is not Found",
    });
  }
});

const getAllapplyUsers = asynchandler(async (req, res) => {
  const applyjob = await AppliedJob.find();

  res.status(200).json({
    success: true,
    applyjob,
  });
});

module.exports = { applicationfill, getapplyUsers, getAllapplyUsers };
