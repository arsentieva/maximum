const express = require("express");

const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Follow } = db;

const { asyncHandler } = require("../utils");

router.use(requireAuth);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const followerId = req.user.id;
    const { followedId } = req.body;
    const followRec = await Follow.findOne({
      where: { followedId },
    });
    if (followRec === null) {
      const follow = await Follow.create({ followerId, followedId });
      res.json({ follow });
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not follow the same author mutiple times.";
      err.title = "Unauthorized";
      throw err;
    }
  })
);
router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const followerId = req.user.id;
    const { followedId } = req.body;
    const follow = await Follow.findOne({
      where: { followedId },
    });

    if (followerId !== follow.followerId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to unfollow this author.";
      err.title = "Unauthorized";
      throw err;
    }
    if (follow) {
      await follow.destroy();
      res.json({ message: `Unfollowed succesfully.` });
    } else {
      next(followNotFoundError());
    }
  })
);

function followNotFoundError() {
  const err = Error("Follow not found");
  err.errors = [`Follow with id of could not be found.`];
  err.title = "Follow not found.";
  err.status = 404;
  return err;
}
module.exports = router;
