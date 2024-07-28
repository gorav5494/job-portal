const express = require("express");
const {
  applicationfill,
  getAllapplyUsers,
  getapplyUsers,
} = require("../controller/applyJobController");
const upload = require("../Middleware/multer");

const router = express.Router();

router.route("/apply").post(upload.single("cv"), applicationfill);
router.route("/:id").get(getapplyUsers);
router.route("/").get(getAllapplyUsers);

module.exports = router;
