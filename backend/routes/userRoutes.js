const express = require("express");
const {
  registerUser,
  authUser,
  GetUser,
  ForgetPassword,
  ResetPassword,
} = require("../controller/userController");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id").get(GetUser);
// router.post("/forgetPassword", forgetPassword);
// router.post("/reset-password/:token", resetPassword);
router.route("/forgetPassword").post(ForgetPassword);
router.route("/resetpassword/:token").post(ResetPassword);

module.exports = router;
