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


// searches for a provided port by heroku or sets to port
var port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
