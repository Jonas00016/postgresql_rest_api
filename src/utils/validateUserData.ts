// helper function to validate the data provided by the user
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
export function validateUserDate(userData: any): string {
    let errorDescriptions = ''
    if (typeof userData.name !== "undefined") {
        errorDescriptions += validateName(userData.name)
    }
    if (typeof userData.email !== "undefined") {
        errorDescriptions += validateEmail(userData.email)
    }
    if (typeof userData.password !== "undefined") {
        errorDescriptions += validatePassword(userData.password)
    }

    return errorDescriptions
}

// helper function to validate the uuid provided by the user
// returns true if the uuid is valid
// otherwise returns false
export function validUuid(uuid: any): boolean {
    if (validateAttributeString(uuid)) return false

    const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    return regExp.test(uuid)
}

// helper function to validate the name provided by the user
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
function validateName(name: any): string {
    const invalidString = validateAttributeString(name)
    if (invalidString) return invalidString

    const invalidStringLength = validateMaxStringLength('name', name, 20)
    if (invalidStringLength) return invalidStringLength

    return ''
}

// helper function to validate the email provided by the user
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
function validateEmail(email: any): string {
    const invalidString = validateAttributeString(email)
    if (invalidString) return invalidString

    const invalidStringLength = validateMaxStringLength('email', email, 50)
    if (invalidStringLength) return invalidStringLength

    const invalidEmailFormat = validateEmailFormat(email)
    if (invalidEmailFormat) return invalidEmailFormat

    return ''
}

// helper function to validate the password provided by the user
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
function validatePassword(password: any): string {
    const invalidString = validateAttributeString(password)
    if (invalidString) return invalidString

    const invalidStringLength = validateMaxStringLength('password', password, 72)
    if (invalidStringLength) return invalidStringLength

    return ''
}

// helper function to validate if data is a valid string
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
function validateAttributeString(attr: any): string {
    return (typeof attr === 'string' && attr.trim().length > 0)
        ?
            ''
        :
            'An entered value is invalid, check if the values are of type a string and contain at least one character\n'
}

// helper function to validate if a email uses valid email format
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
function validateEmailFormat(email: string): string {
    const regexExp = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/gi
    return regexExp.test(email)
        ?
            ''
        :
            'The entered E-Mail adress has an invalid format, check your spelling and try again\n'
}

// helper function to validate if a string does not exceed a maximum length
// if the data is invalid, returns a string containing the error messages
// otherwise returns an empty string
function validateMaxStringLength(attr: string, str: string, maxLength: number): string {
    return str.length > maxLength
        ?
            `The max length of ${attr} is ${maxLength} characters, but the length of ${str} is ${str.length} characters\n`
        :
            ''
}
