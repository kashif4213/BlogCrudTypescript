import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { myAsyncHandler } = require('../asyncHandler')


// Register a new User
const registerUser: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { firstName, lastName, email, password } = req.body
        let registeredUser = await User.create({ firstName, lastName, email, password })
        if (registeredUser) {
            let accessToken: String | undefined = createToken(registeredUser._id.toString(), 'mySecretKey', res, next)
            return res.status(201).json({ accessToken, registeredUser })
        }
    } catch (error) {
        next(error)
    }
})


// Verifying to login the Existing User
const loggedInUser: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (! await bcrypt.compare(req.body.password, req.body.registeredUser.password)) {
            return res.status(404).json({ message: 'Invalid Username or Password.' })
        }
        let accessToken: String | undefined = createToken(req.body.registeredUser._id.toString(), 'mySecretKey', res, next)
        return res.status(200).json({ accessToken, message: req.body.registeredUser.firstName + req.body.registeredUser.lastName + ' Logged In Successfully' })
    } catch (error) {
        next(error)
    }
})


//Reset Password for the User
const resetPassword: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { password } = req.body
        req.body.registeredUser.password = password
        await req.body.registeredUser.save()
        return res.status(200).json({ message: 'Password Changed Successfully', user: req.body.registeredUser })
    } catch (error) {
        next(error)
    }
})


// Logout the current User
const loggedOutUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("jwt")
        return res.status(200).json({ message: 'User Logged Out Successfully.' })
    } catch (error) {
        next(error)
    }
}


// Create a unique token if login or register
const createToken = (_id: String, sk: String, res: Response, next: NextFunction) => {
    try {
        let token: String = jwt.sign({ _id }, sk)
        res.cookie("jwt", token, { expires: new Date(Date.now() + 600000), httpOnly: true })
        return token.toString()
    } catch (error) {
        next(error)
    }
}


export default {
    registerUser, loggedInUser, resetPassword, loggedOutUser
}