const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Story, User } = db;

router.use(requireAuth);

//Get all stories
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const stories = await Story.findAll({
      include: [{ model: User, as: "user", attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["title"], //TODO maybe other attributes or more
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
      where: { id: storyId },
    });
    if (story) {
      res.json({ story });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

const validateStory = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Story title can't be empty."),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Story body can't be empty."),
  //  message cannot be longer than 280 characters:
  check("byline")
    .isLength({ max: 140 })
    .withMessage("Byline can't be longer than140 characters."),
  handleValidationErrors,
  //TODO add the remaining validation
];

//Create a new sotry
router.post(
  "/",
  validateStory,
  asyncHandler(async (req, res) => {
    const userId = "1"; //TODO replace with  this once it is connected with the front end ====> req.user.id;
    const { title, byline, body, image } = req.body; //TODO anything else?
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
    const userId = "1"; //TODO replace with  this once it is connected with the front end ====> req.user.id;
    const story = await Story.findOne({
      where: { id: userId },
    });
    console.log("=====", story.userId, userId);
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
      next(storyNotFoundError(req.params.id));
    }
  })
);

module.exports = router;
