const express = require("express");
const {
  registerUser,
  authUser,
  GetUser,
  ForgetPassoword,
} = require("../controller/userController");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id").get(GetUser);
router.route("/forgot-password").post(ForgetPassoword);

module.exports = router;
