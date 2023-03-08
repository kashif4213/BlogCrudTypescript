import blogController from '../controllers/blogController'
import blogMiddleware from '../middleware/blogMiddleware'
import userMiddleware from '../middleware/userMiddleware'
import express from 'express'

let blogRouter = express.Router()


blogRouter.route('/').get(userMiddleware.verifyToken, blogController.getModels).post(userMiddleware.verifyToken, blogMiddleware.getBlogMiddleware, blogController.createModel)
blogRouter.route('/:id').put(userMiddleware.verifyToken, blogMiddleware.blogMiddlewareUpdateDelete, blogController.updateModel).delete(userMiddleware.verifyToken, blogMiddleware.blogMiddlewareUpdateDelete, blogController.deleteModel)

//blogRouter.param('id', middleware.verifyToken,)


module.exports = blogRouter