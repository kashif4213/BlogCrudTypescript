import { Request, Response, NextFunction, RequestHandler } from "express";

import Blog from '../models/blogModel'
const { myAsyncHandler } = require('../asyncHandler');

const getModels: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let blogs = await Blog.find()
        return res.status(200).json(blogs)
    }
    catch (err) {
        next(err)
    }
})


const createModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let tempBlog = await Blog.create(req.body.blog)
        return res.status(201).json(tempBlog)
    }
    catch (err) {
        next(err)
    }
})


const updateModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('I was here before error', req.body.blog)
        //let updatedBlog :any = req.body.blog
        await req.body.blog.save()
        return res.status(200).json(req.body.blog)
    }
    catch (error) {
        next(error)
    }
})

const deleteModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await req.body.blog.remove()
        return res.status(200).json(req.params.id)
    }
    catch (error) {
        next(error)
    }
})

module.exports = {
    getModels,
    createModel,
    updateModel,
    deleteModel
}