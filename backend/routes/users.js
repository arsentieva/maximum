const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../db/models");
const getUserToken = require("../auth");
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
router.get(
  "/",
  asyncHandler(async (req, res) => {})
);

module.exports = router;
