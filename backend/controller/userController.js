const asynchandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../utils/generateToken");
const sendemail = require("../utils/email");

//Register

const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User Already Exits");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      message: "Register SucessFully yahooo...",
      data: user,
      // _id: user._id,
      // name: user.name,
      // email: user.email,
      // password: user.password,
      // isAdmin: user.isAdmin,
      // token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("User Occured.. !");
  }
  // res.json
  // ({
  //     name,
  //     email,
  //     password,
  // });
});

//Login

const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await user.matchPassword(password)) {
      const token = generateToken(user._id);
      res.status(200).json({
        message: "Login SucessFully yahooo...",
        data: user,
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Invalid Email or Password",
      });
      // throw new Error("Invalid Email or Password");
    }
  } else {
    res.status(400).json({
      message: "User Is not Exists",
    });
  }
});

//forget password

const ForgetPassword = asynchandler(async (req, res) => {
  // console.log("requwdsn");
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({
      message: "User Is not Exists",
    });
  }

  // res.status(200).json({
  //   message: "User Found yahooo...",
  //   // data: user,
  //   // token: token,
  // });
  const token = generateToken(user._id);
  const resetToken = token;

  //reset password request - that means

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetpassword/${resetToken}`;

  const message = `we have a recevied a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10 min`;

  try {
    await sendemail({
      email: user.email,
      subject: "Password change request recevied",
      message: message,
    });
    res.status(200).json({ message: "Sucess send mail" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save(err);
    res.status(500).json({ message: "Server error. Please try again" });
  }

  await user.save();
});
// Reset Password

const ResetPassword = asynchandler(async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update user's password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//profile

const GetUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      message: "User Found...",
      data: user,
    });
  } else {
    res.status(400).json({
      message: "User Is not Found",
    });
  }
});
//

const GetAllUser = asynchandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
// New logout function

/*  */

module.exports = {
  registerUser,
  authUser,
  GetUser,
  ForgetPassword,
  ResetPassword,
  GetAllUser,
};
