import express from 'express'
import { loadUsers, loadUserByUuid, deleteUserByUuid } from './../database/user'
import { ERRORS, createError } from './../utils/error'
import { validateUserDate, validUuid } from '../utils/validateUserData'

// handler function for GET /users/, loads all users from database and sends them as a JSON response
export async function getUsers(req: express.Request, res: express.Response): Promise<void> {

    // load all users
    let users
    try {
        users = await loadUsers()
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
        return
    }

    // send found users, send empty object, if no users are found
    res.json({ users: users || {}});
}

// handler function for GET /users/:uuid, loads user with provided uuid from database and sends him as a JSON response
export async function getUser(req: express.Request, res: express.Response): Promise<void> {
    const { uuid = '' } = req.params

    // validate provided uuid
    if (!validUuid(uuid)) {
        res.status(422).json(ERRORS['uuid'])
        return
    }

    // load user with provided uuid
    let user
    try {
        user = await loadUserByUuid(uuid)
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
        return
    }

    // sends error message, if no user with provided uuid is found
    if (!user) {
        res.status(404).json(ERRORS['404-user'])
            return
    }

    // send found user as JSON response
    res.json(user)
}

// handler function for PATCH /users/:uuid, modifies user with provided uuid, saves him and sends him as a JSON response
export async function updateUser(req: express.Request, res: express.Response): Promise<void> {
    const { uuid = '' } = req.params
    const { name, email, password } = req.body

    // check if body contains new data to modify user with, sends error message, if no data is provided
    if (!name && !email && !password) {
        res.status(400).json(ERRORS['400'])
        return
    }

    // validate provided uuid
    if (!validUuid(uuid)) {
        res.status(422).json(ERRORS['uuid'])
        return
    }

    // validate provided new user data, sends error message, if new user data is not valid
    const validationError = validateUserDate({ name, email, password })
    if (validationError) {
        res.status(422).json(createError('Invalid user data', validationError))
        return
    }

    // load user to modify from database
    let updatedUser
    try {
        const userToUpdate = await loadUserByUuid(uuid)
        if (!userToUpdate) {
            res.status(404).json(ERRORS['404-user'])
            return
        }

        // modify the user
        userToUpdate.name = name ? name : userToUpdate.name
        userToUpdate.email = email ? email : userToUpdate.email
        userToUpdate.password = password ? password : userToUpdate.password

        // save modifications
        updatedUser = await userToUpdate.save()
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
    }

    // send modified user as JSON response
    res.json(updatedUser)
}

// handler function for DELETE /users/:uuid, deletes user with provided uuid from database
export async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
    const { uuid = '' } = req.params

    // validate provided uuid
    if (!validUuid(uuid)) {
        res.status(422).json(ERRORS['uuid'])
        return
    }

    // delete user with provided uuid from database
    let userDeleted
    try {
        userDeleted = await deleteUserByUuid(uuid)
    } catch (err) {
        console.log(err)
        res.status(500).json(ERRORS['database'])
        return
    }

    // if no user was deleted, sends error message
    if (!userDeleted) {
        res.status(404).json(ERRORS['404-user'])
        return
    }

    // delete token from user to log him out
    res.clearCookie('bearer').sendStatus(204)
}
