const router = require('express').Router()
const Blog = require("../models/blog")

router.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate("author", {name: 1})

    response.status(200).json(blogs)
})

router.get("/:id", (request, response, next) => {
    Blog.findById(request.params.id).then(blog => {
        response.status(200).json(blog)
    })
    .catch(error => next(error))
})
  
router.post('/', async(request, response, next) => {
    let blogBody = request.body
    const localUser = request.user

    if(!blogBody.title || !blogBody.url) return response.status(400).json({ error: "Title or URL are missing" })
    if(!blogBody.likes) blogBody = {...blogBody, likes: 0}
    blogBody = {...blogBody, author: localUser.id}

    const blog = new Blog(blogBody)
  
    try{
        const result = await blog.save()
        response.status(201).json(result)
    } catch(e){next(e)}
})

router.delete("/:id", async(request, response) => {
    const blogtoDelete = await Blog.findById(request.params.id)
    const localUser = request.user
    if(localUser.id === blogtoDelete.author.toString()){
        const blogDeleted = await Blog.findByIdAndDelete(request.params.id)
    
        return response.status(204).json(blogDeleted)
    } else {
        return response.status(403).json({ error: "Permission denied" })
    }
})

router.put("/:id", async(request, response) => {
    const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    
    return response.status(204).json(blogUpdated)
})




module.exports = router