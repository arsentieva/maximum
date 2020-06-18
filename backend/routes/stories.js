const express = require("express");

const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Story, User } = db;

const { asyncHandler, validateStory } = require("../utils");

router.use(requireAuth);

//Get all stories
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const stories = await Story.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "body", "byline", "createdAt"], //TODO maybe other attributes or more
    });
    res.json({ stories });
  })
);

function storyNotFoundError(id) {
  const err = Error("Story not found");
  err.errors = [`Story with id of ${id} could not be found.`];
  err.title = "Story not found.";
  err.status = 404;
  return err;
}

// Get a specific story by id
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    let storyId = parseInt(req.params.id, 10);
    const story = await Story.findOne({
      include: [{ model: User, attributes: ["name"] }],
      where: { id: storyId },
      attributes: ["id", "title", "body", "byline", "createdAt"],
    });
    if (story) {
      res.json({ story });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

//Create a new story
router.post(
  "/",
  validateStory,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { title, byline, body, image } = req.body;
    const story = await Story.create({
      //TODO should this be in a try/catch block?
      title,
      byline,
      body,
      image,
      userId,
    });
    res.json({ story });
  })
);

//Update a specific story
router.put(
  "/:id",
  validateStory,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const storyId = req.params.id;
    const story = await Story.findOne({
      where: { id: storyId },
    });

    if (userId.toString() !== story.userId.toString()) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this story.";
      err.title = "Unauthorized";
      throw err;
    }

    if (story) {
      const { title, byline, body, image } = req.body;
      await story.update({ title, byline, body, image }); //TODO should we pass in the userId as well?
      res.json({ story });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

module.exports = router;
