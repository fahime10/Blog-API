const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, minLength: 1, maxLength: 50, required: true },
    text: { type: String, minLenght: 1, maxLength: 1000, required: true },
    timestamp: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("Post", PostSchema);
