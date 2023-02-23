const Joi = require('joi');

const addUserValidationSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    
    confirmPassword : Joi.any()
    .valid(Joi.ref('password'))
    .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

const loginUserValidationSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

const logoutUserValidationSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

module.exports = {
    addUserValidationSchema,
    loginUserValidationSchema,
    logoutUserValidationSchema
}