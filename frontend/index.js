const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign up page" });
});

app.get("/log-in", (req, res) => {
  res.render('log-in');
})



const port = 4001;
app.listen(port, () => {
  console.log(`Listing on port ${port}...`);
});

module.exports = app;
