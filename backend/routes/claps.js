const express = require("express");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { StoryClap } = db;

router.use(requireAuth);

router.get("/:id/story-claps", asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);
    // search for an existing clap based on user and story id
    const clap = await StoryClap.findOne({
        where: { storyId: storyId, userId: userId }
    });
    // I added .json({clap}) to test for res is not defined error in story.js
    // if the clap isn't falsey, send a 200 status indicating ok
    if (clap) res.status(201).json({ clap });
    // if the clap is falsey, send a 204 status indicating successful search, but no db entry
    if (!clap) res.status(204).json({ clap });
}));

router.post("/:id/story-claps", asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);
    await StoryClap.create({
        storyId: storyId,
        userId: userId,
    });
    const numClaps = await StoryClap.count({
        where: { storyId: storyId },
    });
    res.status(201).json({ numClaps });
}));

router.delete("/:id/story-claps", asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);
    await StoryClap.destroy({
        where: { storyId: storyId, userId: userId }
    });
    const numClaps = await StoryClap.count({
        where: { storyId: storyId },
    });
    res.status(201).json({ numClaps });
}));

module.exports = router;
