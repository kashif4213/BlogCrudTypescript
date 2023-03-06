import { Schema } from "joi"

const Joi = require('joi')

const commentValidationSchema: Schema = Joi.object({
    blog: Joi.string()
        .required(),
    description: Joi.string()
        .min(3)
        .max(100)
        .required(),
    Author: Joi.object({
        user: Joi.string().required()
    })
})

module.exports = commentValidationSchema
