import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    description: {
        type: String,
        required: true
    },
    Author: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }

}, {
    timestamps: true
})

export default mongoose.model("Comment",commentSchema)
