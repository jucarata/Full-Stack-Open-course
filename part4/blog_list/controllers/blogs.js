const router = require('express').Router()
const Blog = require("../models/blog")

router.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
         response.status(200).json(blogs)
    })
})

router.get("/:id", (request, response, next) => {
    Blog.findById(request.params.id).then(blog => {
        response.status(200).json(blog)
    })
    .catch(error => next(error))
})
  
router.post('/', (request, response, next) => {
    const blogBody = request.body

    if(!blogBody.title || !blogBody.url) return response.status(400).json({ error: "Title or URL are missing" })

    if(!blogBody.likes) blogBody.likes = 0

    const blog = new Blog(blogBody)
  
    blog.save().then(result => {
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

router.delete("/:id", async(request, response) => {
    const blogDeleted = await Blog.findByIdAndDelete(request.params.id)
    
    return response.status(204).json(blogDeleted)
})

router.put("/:id", async(request, response) => {
    const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    
    return response.status(204).json(blogUpdated)
})




module.exports = router