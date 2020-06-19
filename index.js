const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Define a route.
app.get("/", (req, res) => {
  res.redirect("/stories");
  // res.render("index"); //TODO check if the index.pug file exists and it is setup
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign up page" });
});

app.get("/log-in", (req, res) => {
  res.render("log-in");
});

app.get("/stories", (req, res) => {
  res.render("index");
});

app.get("/stories/:id(\\d+)", (req, res) => {
  res.render("story",{
    id: req.params.id,
  });
});

app.get("/new-story", (req, res) => {
  res.render("new-story");
});

app.get("/stories/:id(\\d+)/comments", (req, res) => {
  res.render("comments", {
    id: req.params.id,
  });
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

// searches for a provided port by heroku or sets to port
var port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
