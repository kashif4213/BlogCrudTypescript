import express, { Express } from 'express';
const {connectDB} = require('./config/db')
const {errorHandler}= require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

const app: Express = express();
const port: Number = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()

app.use('/user', require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(port, () => {
    console.log('app is listening at port ' + port)
})