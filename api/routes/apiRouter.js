const express = require("express");
const router = express.Router();

const index_controller = require("../controllers/indexController");
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

router.get("/", index_controller.index);

router.post("/sign-up", user_controller.sign_up_form_post);

router.post("/login", user_controller.login_form_post);

router.post("/posts", post_controller.posts_get);

router.post("/posts/create", post_controller.posts_create);

router.post("/posts/comments", comment_controller.comments_get);

router.post("/posts/comments/create", comment_controller.comment_create)

module.exports = router;
