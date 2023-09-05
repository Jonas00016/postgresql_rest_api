import { config } from 'dotenv'
import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import cors from 'cors'
import { connectToDatabase } from './config/database'
import { userRouter } from './routes/users'
import { authRouter } from './routes/auth'

// configure dotenv, enableing one to use process.env
config()

const ADDRESS = process.env.ADDRESS as string
const PORT = process.env.PORT as any as number

// setup server to use Content-Type JSON, enable cookies and configure cors
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true
}))

// set the routers for the corrosponding endpoints
app.use('/users', userRouter)
app.use('/auth', authRouter)

// send 404 on undefined routes
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
	next(createError(404))
})

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    // set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

    // send the error response
	res.sendStatus(err.status || 500)
})

// create the server
const server = http.createServer(app)

// connect to the database
connectToDatabase()

// listen on
server.listen(PORT, () => {
    console.log(`Server is running on ${ADDRESS}:${PORT}`)
})
