const AppliedJob = require("../Models/applyJobs");
const asynchandler = require("express-async-handler");
const path = require("path");

const applicationfill = asynchandler(async (req, res) => {
  const { user, job, name, email, about } = req.body;
  const file = req.file.path;

  const applydata = await AppliedJob.create({
    user,
    job,
    name,
    email,
    about,
    file,
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

module.exports = applicationfill;
