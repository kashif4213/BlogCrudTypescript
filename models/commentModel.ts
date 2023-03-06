import { Schema, model } from "mongoose";
let mongoose = require('mongoose')
const commentSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    description: {
        type: String,
        required: true
    },
    Author: {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }

}, {
    timestamps: true
})
var Comment;

if (mongoose.models.Comment) {
    Comment = mongoose.model('Comment');
} else {
    Comment = mongoose.model('Comment', commentSchema);
}

module.exports = Comment;
//module.exports = model('Comment', commentSchema)