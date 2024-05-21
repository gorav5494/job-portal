const asynchandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../utils/generateToken");

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

const ForgetPassoword = asynchandler(async () => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpires = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;

    await user.save();

    res.json({
      message: "Reset token generated. You can now reset your password.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

module.exports = { registerUser, authUser, GetUser, ForgetPassoword };
