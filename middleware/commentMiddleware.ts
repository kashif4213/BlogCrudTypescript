import { Request, Response, NextFunction, RequestHandler } from "express"
import commentValidationSchema from '../validations/commentValidationSchema'
import Comment from '../models/commentModel'

let { myAsyncHandler } = require('../asyncHandler')

const commentMiddleware: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { blog, description, Author } = req.body
        const value = await commentValidationSchema.validateAsync(req.body)
        if (value) {
            req.body.comment = { blog, description, Author }
            next()
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
})

const commentMiddlewareUpdateDelete: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //console.log('I am here', req.params.id)
    try {
        let { blog, description, Author } = req.body
        req.body.comment = await Comment.findById(req.params.id)
        if (!req.body.comment) {
            return res.status(404).json({ message: 'No such Comment Exists.' })
        }
        if (req.method === 'DELETE') {
            next()
        }
        else {
            const value = await commentValidationSchema.validateAsync({ blog, description, Author })
            if (value) {
                req.body.comment.description = description
                req.body.comment.blog = blog
                req.body.comment.Author = Author
                next()
            }
        }

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
})




export default {
    commentMiddleware,
    commentMiddlewareUpdateDelete
}