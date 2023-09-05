import express from 'express'
import { config } from 'dotenv'
import { createUser } from './../database/user'
import { validateUserDate } from '../utils/validateUserData'
import { ERRORS, createError } from './../utils/error'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loadUserByEmail } from './../database/user'
config()

// handler function for POST /auth/login/, loads user with provided email from database and tries to verify his password
// creates new JWT token for the user, if the login is successful
export async function login(req: express.Request, res: express.Response): Promise<void> {
    const { email, password } = req.body

    // checks if email and password are provided, if one is missing, sends error message
    if (!email || !password) {
        res.status(400).json(ERRORS['400'])
        return
    }

    // validate email and password, if one is invalid, sends error message
    const validationError = validateUserDate({ email, password })
    if (validationError) {
        res.status(422).json(createError('Invalid user data', validationError))
        return
    }

    // loads user with provided email from database
    let requestedUser
    try {
        requestedUser = await loadUserByEmail(email)
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
        return
    }

    // checks if a user was found, if not sends error message
    if (!requestedUser) {
        res.status(404).json(ERRORS['404-user'])
        return
    }

    // validates the provided password
    const passwordCorrect = await bcrypt.compare(password, requestedUser?.password || '')

    // if password is incorrect, send error message
	if (!passwordCorrect) {
		res.status(401).json(ERRORS['401'])
		return
	}

    // creates and sets new JWT token for the user
    createAndSetToken(res, { requestedUser })
    res.json(requestedUser)
}

// handler function for POST /auth/register/, creates new user with provided data
// if user creation is successful, also creates a new JWT token for the user
export async function register(req: express.Request, res: express.Response): Promise<void> {
    const { name, email, password } = req.body

    // checks if name, email and password are provided, if one is missing, sends error message
    if (!name || !email || !password) {
        res.status(400).json(ERRORS['400'])
        return
    }

    // validate name, email and password, if one is invalid, sends error message
    const validationError = validateUserDate({ name, email, password })
    if (validationError) {
        res.status(422).json(createError('Invalid user data', validationError))
        return
    }

    // check if user with the provided email exists in database
    let userAlreadyExists
    try {
        userAlreadyExists = await loadUserByEmail(email)
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
        return
    }

    // if user with provided email already exists, sends error message
    if (userAlreadyExists) {
        res.status(409).json(ERRORS['409'])
        return
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // create new user with the provided data
    let newUser
    try {
        newUser = await createUser(name, email, passwordHash)
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
        return
    }

    // creates and sets new JWT token for the user
    createAndSetToken(res, { newUser })

    res.json(newUser)
}

// handler function for POST /auth/logout/, deletes the JWT token from the user
export function logout(req: express.Request, res: express.Response): void {
    res.clearCookie('bearer').json({ message: 'Logout successfull' })
    res.end()
}

// helper function to create and set a JWT token
function createAndSetToken(res: express.Response, user: object) {
	const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret, {
		expiresIn: 3600,
	})

	res.cookie('bearer', token, { httpOnly: true })
}
