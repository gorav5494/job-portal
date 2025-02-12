const express = require("express");
const app = express();
const userModel = require("./usermodel");

// User Create

app.get("/create", async (req, res) => {
  let CreateUser = await userModel.create({
    name: "amit",
    email: "amit21@gmail.com",
  });
  res.send(CreateUser);
  console.log("Hello User created");
});

// User Update

app.get("/update", async (req, res) => {
  let Updateuser = await userModel.findOneAndUpdate(
    { email: "gorav21@gmail.com" },
    { email: "gorav5653@gmail.com" },
    { new: true }
  );
  res.send(Updateuser);
  console.log("Hello User created");
});

// Read Data

app.get("/read", async (req, res) => {
  let Users = await userModel.find();

  res.send(Users);
});

// Read particular one

app.get("/readone", async (req, res) => {
  let UsersOne = await userModel.find({ name: "Gorav" });

  res.send(UsersOne);
});

// Delete Data

app.get("/delete", async (req, res) => {
  let UserDelete = await userModel.findOneAndDelete({
    email: "gorav5653@gmail.com",
  });
  res.send(UserDelete);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
