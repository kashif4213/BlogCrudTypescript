import { Schema } from "joi"
import Joi from 'joi'


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

export default commentValidationSchema
