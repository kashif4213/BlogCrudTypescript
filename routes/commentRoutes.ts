import commentController from '../controllers/commentController'
import commentMiddleware from '../middleware/commentMiddleware'
import express from 'express'
import userMiddleware from '../middleware/userMiddleware'

let commentRouter = express.Router()

commentRouter.route('/').get(userMiddleware.verifyToken, commentController.getComments).post(userMiddleware.verifyToken, commentMiddleware.commentMiddleware, commentController.createComment)

commentRouter.route('/:id').put(userMiddleware.verifyToken, commentMiddleware.commentMiddlewareUpdateDelete, commentController.updateComment).delete(userMiddleware.verifyToken, commentMiddleware.commentMiddlewareUpdateDelete, commentController.deleteComment)

//commentRouter.param("id", commentMiddleware2.verifyToken, commentParamHandler)


module.exports = commentRouter