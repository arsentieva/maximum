const express = require("express");
const { validateComment, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Story, User, Comment } = db;

router.use(requireAuth);

// TODO: Is there a better way at handling the route? Currently Works as written
router.get("/:id/comments", asyncHandler(async (req, res) => {
    const storyId = req.params.id;
    const comments = await Comment.findAll({
        include: [
            { model: Story, where: { id: storyId }, attributes: ["id", "title", "userId"] },
            { model: User, attributes: ["id", "name"] }
        ],
        order: [["createdAt", "DESC"]],
        attributes: ["id", "body", "createdAt", "updatedAt"],
    });
    res.json({ comments });
    res.render('comments', {
        comments,
    })
}));

function commentNotFoundError(id) {
    const err = Error("Comment not found");
    err.errors = [`Comment with id of ${id} could not be found`];
    error.title = "Comment not found";
    err.status = 404;
    return err;
}

router.post("/:id/comments", validateComment, asyncHandler(async (req, res) => {
    const storyId = req.params.id;
    const userId = req.user.id;
    const { body } = req.body; // TODO Anything Else?
    const comment = await Comment.create({
        body,
        userId,
        storyId,
    });
    res.json({ comment });
}));

router.put("/:storyId/comments/:commentId", validateComment, asyncHandler(async (req, res, next) => {
    // TODO Not sure if needed for processing a comment update
    // const storyId = req.params.id;
    // const story = await Story.findOne({
    //     where: { id: storyId }
    // });
    const userId = req.user.id;
    const commentId = req.params.commentId;
    const storyId = req.params.storyId;
    const comment = await Comment.findOne({
        where: { id: commentId }
    });
    if (userId.toString() !== comment.userId.toString()) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this comment.";
        err.title = "Unauthorized"
        throw err;
    }
    if (comment) {
        const { body } = req.body;
        await comment.update({ body, updatedAt: new Date(), userId, storyId });
        res.json({ comment });
    } else {
        next(commentNotFoundError(commentId));
    }

}))

module.exports = router;
