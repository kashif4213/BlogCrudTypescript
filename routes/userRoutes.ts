import express from 'express'
import userController from '../controllers/userController'
import userMiddleware  from '../middleware/userMiddleware'

let userRouter = express.Router()

userRouter.route('/register').post(userMiddleware.validateUser, userController.registerUser)
userRouter.route('/login').post(userMiddleware.validateUser, userController.loggedInUser)
userRouter.route('/resetPassword').post(userMiddleware.validateUser, userController.resetPassword)
userRouter.route('/logout').post(userMiddleware.verifyToken, userMiddleware.validateUser, userController.loggedOutUser)

export default userRouter
