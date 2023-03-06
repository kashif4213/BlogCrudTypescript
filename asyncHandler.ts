import { Request, Response, NextFunction, RequestHandler } from "express"

const myAsyncHandler: RequestHandler = (asyncFunction: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		asyncFunction(req, res, next).catch(next)
	}
}
module.exports = { myAsyncHandler } 