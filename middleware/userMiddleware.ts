import { Request, Response, NextFunction, RequestHandler } from "express"
import User from "../models/userModel"
import userValidator from "../validations/userValidationSchema"
import jwt from 'jsonwebtoken'


const { myAsyncHandler } = require("../asyncHandler")

const validateUser: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.path === '/register') {
            const value = await userValidator.addUserValidationSchema.validateAsync(req.body)
            if (value) {
                let registeredUser = await User.find({ email: req.body.email })
                if (registeredUser.length > 0) {
                    return res.status(404).json({ message: 'This User is already Registered.' })
                }
                if (req.body.confirmPassword && req.body.password === req.body.confirmPassword) {
                    req.body.registeredUser = registeredUser[0]
                    next()
                }
            }
        }
        else if (req.path === '/logout') {
            const value = await userValidator.logoutUserValidationSchema.validateAsync(req.body)
            if (value) {
                next()
            }
        }
        else if (req.path == '/resetPassword') {
            const value = await userValidator.addUserValidationSchema.validateAsync(req.body)
            if (value) {
                let registeredUser = await User.find({ email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName })
                if (registeredUser.length < 0) {
                    return res.status(404).json({ message: 'Sorry, No such User is found.' })
                }
                req.body.registeredUser = registeredUser[0]
                next()
            }
        }
        else if (req.path === '/login') {
            const value = await userValidator.loginUserValidationSchema.validateAsync(req.body)
            if (value) {
                let registeredUser = await User.find({ email: req.body.email })
                if (registeredUser.length < 0) {
                    return res.status(404).json({ message: 'Invalid Username or Password.' })
                }
                req.body.registeredUser = registeredUser[0]
                next()
            }
        }
    } catch (error) {
        res.status(404)
        next(error)
    }
})


const verifyToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.jwt
        if (accessToken) {
            if (jwt.verify(accessToken, 'mySecretKey')) {
                next()
            }
        }
        else {
            res.status(400).json({ message: 'Please Log In to Continue' })
        }
    } catch (error) {
        next(error)
    }

}


export default    {validateUser,
    verifyToken
}