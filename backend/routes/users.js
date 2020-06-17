const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../db/models");
const { getUserToken } = require("../auth");

const {
  asyncHandler,
  validateUserInfo,
  validateEmailAndPassword,
} = require("../utils");

const router = express.Router();

//GET A USER BY ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findByPk(parseInt(req.params.id, 10));
    const token = getUserToken(user);
    res.status(201).json({ user: { id: user.id }, token });
  })
);

//CREATE A USER
router.post(
  "/",
  validateUserInfo,
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { name, bio, image, email, password } = req.body;
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

function userNotFoundError(id) {
  const err = Error("User not found");
  err.errors = [`User with id of ${id} could not be found.`];
  err.title = "User not found.";
  err.status = 404;
  return err;
}
//Allow USER record to be updated
router.put(
  "/:id",
  validateUserInfo,
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findOne({ where: { id: userId } });
    if (user === null) {
      next(userNotFoundError(userId));
      return;
    }
    if (userId !== user.id.toString()) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this story.";
      err.title = "Unauthorized";
      throw err;
    }

    if (user) {
      const { name, email, image, bio } = req.body;
      await user.update({ name, email, image, bio });
      res.json({
        name: user.name,
        bio: user.bio,
        email: user.email,
        image: user.image,
      });
    }
  })
);

module.exports = router;
