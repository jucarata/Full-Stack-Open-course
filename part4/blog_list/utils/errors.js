class ContentMissingError extends Error {
    constructor(message){
        super(message)
        this.name = "ContentMissingError"
    }
}

class InvalidPasswordError extends Error {
    constructor(message){
        super(message)
        this.name = "InvalidPasswordError"
    }
}

module.exports = {ContentMissingError, InvalidPasswordError}