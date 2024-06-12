const mongoose = require("mongoose");

const ApplyJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: [true, "Please provide a file"],
    },
  },
  { timestamps: true }
);

// const AppliedJob =
//   mongoose.models.AppliedJob || mongoose.model("AppliedJob", ApplyJobSchema);

const AppliedJob = mongoose.model("AppliedJob", ApplyJobSchema);

module.exports = AppliedJob;
