const User = require('../models/userModel');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

exports.sign_up_form_post = asyncHandler(async (req, res, next) => {
    try {
        let password = req.body.password;
        
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                return;
            } else {
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword
                });

                await user.save();
            }
        });
    } catch (err) {
        return next(err);
    }
});