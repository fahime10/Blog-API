const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

exports.posts_get = asyncHandler(async (req, res, next) => {
    try {
        const allPosts = await Post.find().populate('user').exec();

        res.send(allPosts);
        
    } catch (err) {
        console.log(err);
    }
});