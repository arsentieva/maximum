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
    const clap = await StoryClap.findOne({
        where: { storyId: storyId, userId: userId }
    });
    if(clap) res.status(200);
    if(!clap) res.status(204);
}));

router.post("/:id/story-claps", asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);
    const clap = await StoryClap.create({
        storyId,
        userId,
    });
    res.status(201).json({ clap });
}));

router.delete("/:id/story-claps", asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);
    await StoryClap.destroy({
        where: { storyId: storyId, userId: userId }
    });
}));

module.exports = router;
