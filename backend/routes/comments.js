const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, validateComment, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");
const { noExtendLeft } = require("sequelize/types/lib/operators");

const { Story, User, Comment } = db;

router.use(requireAuth);

// TODO: Is there a better way at handling the route? Currently Works as written
router.get("/:id/comments", asyncHandler(async (req, res) => {
    const storyId = req.params.id;
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

function commentNotFoundError(id) {
    const err = Error("Story not found");
    err.errors = [`Story with id of ${id} could not be found`];
    error.title = "Story not found";
    err.status = 404;
    return err;
}

router.post("/:id/comments", validateComment, asyncHandler(async (req, res) => {
    const storyId = req.params.id;
    const { body, createdAt, userId } = req.body; // TODO Anything Else?
    const comment = await Comment.create({
        body,
        storyId,
        userId,
        createdAt,
    });
    res.json({ comment });
}));

router.put("/:id/comments/:commentId", validateComment, asyncHandler(async (req, res, next) => {
    const storyId = req.params.id;
    const story = await Story.findOne({
        where: { id: storyId }
    });
    const commentId = req.params.commentId;
    const comment = await Comment.findOne({
        where: { id: commentId }
    });
    if(req.user.id.toString() !== comment.userId.toString()) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this comment.";
        err.title = "Unauthorized"
        throw err;
    }
    if(comment) {
        const { body, createdAt, userId } = req.body;
        await comment.update({ body, createdAt, userId });
        res.json({ comment });
    } else {
        next(commentNotFoundError(commentId));
    }

}))

module.exports = router;
