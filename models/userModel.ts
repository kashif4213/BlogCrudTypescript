import { Schema, model } from 'mongoose';
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email.']
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error: any) {
        next(error)
    }
})

module.exports = model('User', userSchema)