const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const environment = require("./config/index").environment;
const userRouter = require("./routes/users");
const storiesRouter = require("./routes/stories");
const commentsRouter = require("./routes/comments");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4001" }));

app.use("/users", userRouter);
app.use("/stories", storiesRouter);
app.use("/stories/:id/comments", commentsRouter);

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  console.log(err);
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
