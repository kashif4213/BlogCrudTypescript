const { createComment, getComments, updateComment, deleteComment } = require('../controllers/commentController')
const {commentMiddleware, commentMiddlewareUpdateDelete} = require('../middleware/commentMiddleware')
let commentRouter= require('express').Router()
let commentMiddleware2 = require('../middleware/userMiddleware')

commentRouter.route('/').get(commentMiddleware2.verifyToken, getComments).post(commentMiddleware2.verifyToken, commentMiddleware, createComment)

commentRouter.route('/:id').put(commentMiddleware2.verifyToken,commentMiddlewareUpdateDelete,updateComment).delete(commentMiddleware2.verifyToken,commentMiddlewareUpdateDelete,deleteComment)

//commentRouter.param("id", commentMiddleware2.verifyToken, commentParamHandler)


module.exports = commentRouter