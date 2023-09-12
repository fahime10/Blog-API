const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

exports.posts_get = asyncHandler(async (req, res, next) => {
    try {
        const allPosts = await Post.find().populate("user").exec();

        res.send(allPosts);
        
    } catch (err) {
        console.log(err);
    }
});

exports.posts_create = asyncHandler(async (req, res, next) => {;
    try {
        const post = new Post({
            user: req.body.user,
            title: req.body.title,
            text: req.body.text
        });

        await post.save();

    } catch (err) {
        console.log(err);
    }
});