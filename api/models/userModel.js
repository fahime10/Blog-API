const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, minLength: 1, maxLength: 20, required: true },
    password: { type: String, minLength: 4, required: true }
});

module.exports = mongoose.model('User', UserSchema);
