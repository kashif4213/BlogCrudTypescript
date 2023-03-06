const express = require('express')
const { registerUser, loggedInUser, resetPassword, loggedOutUser } = require('../controllers/userController')
let { validateUser, verifyToken } = require('../middleware/userMiddleware')
let userRouter = express.Router()
const User = require('../models/userModel')


userRouter.route('/register').post(validateUser, registerUser)
userRouter.route('/login').post(validateUser, loggedInUser)
userRouter.route('/resetPassword').post(validateUser, resetPassword)
userRouter.route('/logout').post(verifyToken, validateUser, loggedOutUser)

module.exports = userRouter;
