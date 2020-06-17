const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Story, User, Comment } = db;

router.use(requireAuth);

// TODO: Is there a better way at handling the route? Currently Works as written
router.get("/:id/comments", asyncHandler(async (req, res) => {
    const storyId = req.params.id;
    console.log(req.params.id)
    // console.log(storyId)
    const comments = await Comment.findAll({
        include: [
            { model: Story, where: { id: storyId }, },
            { model: User, attributes: ["name"] }
        ],
        order: [["createdAt", "DESC"]],
        attributes: ["id", "body", "createdAt", "updatedAt"],
    });
    res.json({ comments });
}));

module.exports = router;
