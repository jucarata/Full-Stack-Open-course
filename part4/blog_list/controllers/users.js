const bcrypt = require('bcrypt')
const router = require("express").Router()
const User = require("../models/user")


router.post("/", async(request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    
    const userCreated = await user.save()

    return response.status(201).json(userCreated)
})

router.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs')

    return response.status(200).json(users)
})

router.get('/:id', async(request, response) => {
    const user = await User.findById(request.params.id).populate('blogs')

    return response.status(200).json(user)
})

router.delete('/:id', async(request, response) => {
    const user = await User.findByIdAndDelete(request.params.id)

    return response.status(200).json(user)
})




module.exports = router
