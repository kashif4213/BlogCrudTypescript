import mongoose from "mongoose"
import validator from 'validator'

const blogSchema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
}, {
    timestamps: true
})

export default mongoose.model("Blog", blogSchema)