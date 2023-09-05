import { Router } from 'express'
import { login, register, logout } from './../controller/auth'

// create router
export const authRouter = Router()

// make the router use the corrosponding functions of the auth controller to handle requests
authRouter.post('/login', login)

authRouter.post('/register', register)

authRouter.post('/logout', logout)
