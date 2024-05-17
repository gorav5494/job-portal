const mongoose = require("mongoose");

const ApplyJobSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
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
    resume: {
      type: String,
      ref: "File",
    },
    // resume: {
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
    // },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);

// const AppliedJob =
//   mongoose.models.AppliedJob || mongoose.model("AppliedJob", ApplyJobSchema);

const AppliedJob = mongoose.model("AppliedJob", ApplyJobSchema);

module.exports = AppliedJob;
