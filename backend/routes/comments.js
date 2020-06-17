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
    const { id, body, createdAt, userId } = comments;
    res.json({ id, body, createdAt, userId });
}));

function commentNotFoundError(id) {
    const err = Error("Comment not found");
    err.errors = [`Comment with id of ${id} could not be found`];
    error.title = "Comment not found";
    err.status = 404;
    return err;
}

router.post("/:id/comments", validateComment, handleValidationErrors, asyncHandler(async (req, res) => {
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

router.put("/:id/comments/:commentId", validateComment, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    // TODO Not sure if needed for processing a comment update
    // const storyId = req.params.id;
    // const story = await Story.findOne({
    //     where: { id: storyId }
    // });
    const commentId = req.params.commentId;
    const comment = await Comment.findOne({
        where: { id: commentId }
    });
    if(userId.toString() !== comment.userId.toString()) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this comment.";
        err.title = "Unauthorized"
        throw err;
    }
    if(comment) {
        const { body } = req.body;
        await comment.update({ body, updatedAt: new Date(), userId });
        res.json({ comment });
    } else {
        next(commentNotFoundError(commentId));
    }

}))

module.exports = router;
