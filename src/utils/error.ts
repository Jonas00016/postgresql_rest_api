// collection of error cases and corrosponding error messages
export const ERRORS = {
    'database': createError(
        'Database error',
        'An unexpected error occurred while interacting with the database'
    ),
    'uuid': createError(
        'Invalid UUID',
        'The submitted UUID could not get verified, please check the entered UUID and try again'
    ),
    '404-user': createError(
        'User not found',
        'Requested user could not be found or does not exist'
    ),
    '403': createError(
        'Authentication required',
        'You need to be logged in to access this ressource'
    ),
    '401': createError(
        'Authentication failed',
        'Failed to login, please check your credentials and try again'
    ),
    '409': createError(
        'User already exists',
        'The entered E-Mail address is already taken, log in instead or use another email address'
    ),
    '400': createError(
        'Invalid data',
        'The submitted data is invalid, check if you provided all the required data in the correct format'
    )
}

// helper function to prepare error json response
export function createError(message: string, details: string): object {
    return {
        message,
        details
    }
}
