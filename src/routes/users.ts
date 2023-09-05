import { Router } from 'express'
import { getUsers, getUser, updateUser, deleteUser } from './../controller/users'
import { authenticate } from '../middlewares/auth.middleware'

// create router
export const userRouter = Router()

// setup the router to use the authenticate middleware for all routes and
// make the corrosponding functions of the users controller handle requests
userRouter.get('/', authenticate, getUsers)

userRouter.get('/:uuid', authenticate, getUser)

userRouter.patch('/:uuid', authenticate, updateUser)

userRouter.delete('/:uuid', authenticate, deleteUser)
