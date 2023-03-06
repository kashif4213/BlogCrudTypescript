import { Schema, model } from "mongoose";
const validator = require('validator')
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: [validator.isAlphanumeric, 'Title may only have letters and numbers.']
    },
    description: {
        type: String,
        required: true,
        validate: [(value: any) => {
            if (value.length > 100) {
                return false;
            }
            return true;
        },
            'Description is too Long'
        ]
    },
    nLikes: {
        type: Number,
        required: true
    },
    numComments: {
        type: Number,
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

module.exports = model('Blog', blogSchema)