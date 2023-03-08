import express, { Express } from 'express';
import  connectDB from './config/db'
import  errorHandler from './middleware/errorMiddleware'
import cookieParser from 'cookie-parser'

const app: Express = express();
const port: Number = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()

app.use('/user', require('./routes/userRoutes'))
app.use('/blog', require('./routes/blogRoutes'))
app.use('/comment', require('./routes/commentRoutes'))
app.use(errorHandler)


app.listen(port, () => {
    console.log('app is listening at port ' + port)
})