const router = require("express").Router()
const User = require("../models/user")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/", async(request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({ username })

    if(user){
        const isCorrectPass = await bycrpt.compare(password, user.passwordHash)

        if(!(user && isCorrectPass)) return response.status(401).json({error: "Invalid password or username"})
        
        const token = jwt.sign({username: user.username, id: user._id}, process.env.SECRET)
    
        return response.status(200).send({token, username: user.username, name: user.name})
    } else {
        return response.status(401).json({error: "Invalid username"})
    }
    
})




module.exports = router