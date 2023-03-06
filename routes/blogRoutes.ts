const { createModel, getModels, updateModel, deleteModel, BlogParamHandler } = require('../controllers/blogController')
const { getBlogMiddleware, blogMiddlewareUpdateDelete } = require('../middleware/blogMiddleware')
let blogMiddleware = require('../middleware/userMiddleware')
let blogRouter = require('express').Router()


blogRouter.route('/').get(blogMiddleware.verifyToken, getModels).post(blogMiddleware.verifyToken, getBlogMiddleware, createModel)
blogRouter.route('/:id').put(blogMiddleware.verifyToken, blogMiddlewareUpdateDelete, updateModel).delete(blogMiddleware.verifyToken, blogMiddlewareUpdateDelete, deleteModel)

//blogRouter.param('id', middleware.verifyToken,)




module.exports = blogRouter