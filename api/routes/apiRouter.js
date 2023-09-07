const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const user_controller = require('../controllers/userController');

router.get('/', index_controller.index);

router.post('/sign-up', user_controller.sign_up_form_post);

module.exports = router;
