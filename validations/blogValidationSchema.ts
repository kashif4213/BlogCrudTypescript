import { Schema } from "joi"

const Joi = require('joi')

const addBlogValidationSchema: Schema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .min(3)
        .max(100)
        .required(),
    nLikes: Joi.number()
        .required(),
    numComments: Joi.number()
        .required(),
    Author: Joi.object({
        user: Joi.string().required()
    })


})

module.exports = addBlogValidationSchema
