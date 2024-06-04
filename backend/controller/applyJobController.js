const AppliedJob = require("../Models/applyJobs");
const asynchandler = require("express-async-handler");

// const applicationfill = asynchandler(async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     const { user, job, name, email, about } = req.body;

//     const applicationfill = await AppliedJob.create({
//       user,
//       job,
//       name,
//       email,
//       about,
//     });

//     // file uploaded

//     const uploadedFile = new AppliedJob({
//       fileName: req.file.originalname,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//       fileSize: req.file.size,
//     });
//     await uploadedFile.save();

//     res.json({ message: "File uploaded successfully", file: uploadedFile });

//     console.log("dkf", req.body);
//     if (applicationfill) {
//       res.status(201).json({
//         message: "Application Submit SucessFully",
//         data: applicationfill,
//       });
//     } else {
//       res.status(400);
//       throw new Error("Submit  Occured.. !");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

const applicationfill = asynchandler(async (req, res) => {
  try {
    const { user, job, name, email, about } = req.body;
    const file = req.file;

    const applyjob = await AppliedJob.create({
      user,
      job,
      name,
      email,
      about,
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: file.size,
    });

    await applyjob.save();
    res.status(201).json(applyjob);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = applicationfill;
