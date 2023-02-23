import  { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

const errorHandler: ErrorRequestHandler  = (err : any ,req : Request, res : Response, next :NextFunction) => {
    const statusCode: number = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    if (err.message) {
        res.json({ message : err.message})
    }
}

module.exports = {
    errorHandler
}