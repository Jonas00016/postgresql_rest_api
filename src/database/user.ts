import { User } from './../database/user.model'

// return a promise resolving in an array containing all users of the Users table
export async function loadUsers(): Promise<User[]> {
    return User.findAll()
}


// return a promise resolving in an user object with corresponding email address
// if no user is found, return a promise resolving in null
export async function loadUserByEmail(email: string): Promise<User | null> {
    return User.findOne({
            where: {
                email
            }
        })
}

// return a promise resolving in an user object with corresponding uuid
// if no user is found, return a promise resolving in null
export async function loadUserByUuid(uuid: string): Promise<User | null> {
    return User.findOne({
            where: {
                uuid
            }
        })
}

// create a new user with the provided data
// return a promise resolving in the new created user
export async function createUser(name: string, email: string, password: string): Promise<User> {
    return User.create({
        name,
        email,
        password
    })
}

// delete user with corresponding uuid
// returns Promise resolving in the number of deleted users
export async function deleteUserByUuid(uuid: string): Promise<number> {
    return User.destroy({
            where: {
                uuid,
            }
        })
}
