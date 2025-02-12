const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Home Api

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    // console.log(files);
    res.render("index", { files: files });
  });
});

// Create data form post Api

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
  // console.log(req.body);
});

// Get the Data with filename Api

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filesdata) {
      // console.log(filesdata);
      res.render("show", {
        filename: req.params.filename,
        filesdata: filesdata,
      });
    }
  );
});

// fileName get perivous name

app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});

// Rename the fileName

app.post("/edit", function (req, res) {
  console.log(req.body);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      res.redirect("/");
    }
  );
});

app.listen(3000, function () {
  console.log("Running server...");
});
