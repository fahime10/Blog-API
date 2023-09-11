const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

router.get('/', index_controller.index);

router.post('/sign-up', user_controller.sign_up_form_post);

router.post('/login', user_controller.login_form_post);

router.post('/posts', post_controller.posts_get);

router.post('/posts/create', post_controller.posts_create);

module.exports = router;
