const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/users");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4001" }));

app.use("/users", userRouter);

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
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
