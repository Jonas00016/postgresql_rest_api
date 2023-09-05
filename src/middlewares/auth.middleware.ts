import express from 'express'
import jwt from 'jsonwebtoken'
import { ERRORS } from '../utils/error'


// function to check if a request contains a valid JWT token
export function authenticate(req: express.Request, res: express.Response, next: express.NextFunction): void {
    // extract token from cookies
    const bearer = req?.cookies['bearer']

    // send error message, if no token is provided
    if (!bearer) {
        res.status(403).json(ERRORS['403'])
        return
    }

    const jwtSecret = process.env.JWT_SECRET as jwt.Secret

    // verify the provided token and send error, if the token is not valid
    try {
        jwt.verify(bearer, jwtSecret)
    } catch (err) {
        res.status(401).json(ERRORS['401'])
        return
    }

    next()
}
