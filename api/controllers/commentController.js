const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

exports.comments_get = asyncHandler(async (req, res, next) => {
    try {
        const [allComments, post] = await Promise.all([
            Comment.find({ post: req.body.post }).populate("user").populate("post").exec(),
            Post.findById(req.body.post).populate("user").exec()
        ]);

        res.send({comments: allComments, post: post});

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