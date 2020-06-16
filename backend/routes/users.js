const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../db/models");
const { getUserToken } = require("../auth");
const {
  asyncHandler,
  handleValidationErrors,
  validateUserInfo,
  validateEmailAndPassword,
} = require("../utils");

const router = express.Router();

//CREATE A USER
router.post(
  "/",
  validateUserInfo,
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name, bio, image, email, password } = req.body;
    console.log(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, bio, image, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({ user: { id: user.id }, token });
  })
);

//allow user to log in
router.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

module.exports = router;
