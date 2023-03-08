import { Request, Response, NextFunction, RequestHandler } from "express";

const Comment = require('../models/CommentModel');
const { myAsyncHandler } = require('../asyncHandler');
const { commentValidationSchema } = require('../validations/commentValidationSchema');

const getComments: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let comments = await Comment.find()
        return res.status(200).json(comments)
    }
    catch (err) {
        next(err)
    }
})

const createComment: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let tempComment = await Comment.create(req.body.comment)
        return res.status(201).json(tempComment)
    }
    catch (err) {
        next(err)
    }
})


const updateComment: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await req.body.comment.save()
        return res.status(200).json(req.body.comment)
    }
    catch (error) {
        next(error)
    }
})

const deleteComment: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await req.body.comment.remove()
        return res.status(200).json(req.body.comment._id)
    }
    catch (error) {
        next(error)
    }
})

//const commentParamHandler: RequestHandler = 

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
}