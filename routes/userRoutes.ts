const express = require('express')
const { registerUser, loggedInUser, resetPassword, loggedOutUser } = require('../controllers/userController')
const { validateUser, verifyToken } = require('../middleware/userMiddleware')
const router = express.Router()
const User = require('../models/userModel')


router.route('/register').post(validateUser, registerUser)
router.route('/login').post(validateUser, loggedInUser)
router.route('/resetPassword').post(validateUser, resetPassword)
router.route('/logout').post(verifyToken,validateUser, loggedOutUser)

module.exports = router;
