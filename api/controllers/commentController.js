const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

exports.comments_get = asyncHandler(async (req, res, next) => {
    try {
        const allComments = await Comment.find({ post: req.body.post }).populate("user").populate("post").exec();

        console.log(allComments);
        res.send(allComments);

    } catch (err) {
        console.log(err);
    }
});

exports.comment_create = asyncHandler(async (req, res, next) => {
    try {
        const comment = new Comment({
            user: req.body.user,
            post: req.body.post,
            text: req.body.text
        });

        await comment.save();

    } catch (err) {
        console.log(err);
    }
});