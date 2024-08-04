const mongoose = require("mongoose")

const userScheme = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        minLength: 3,
        required: true
    },
    name: String,
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: "Blog"}],
})

userScheme.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
})


module.exports = mongoose.model("User", userScheme)