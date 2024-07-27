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
    const blog = new Blog(request.body)
  
    blog.save().then(result => {
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

router.delete("/:id", (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id).then(blogDeleted => {
        response.status(204).json(blogDeleted)
    })
    .catch(error => next(error))
})

router.put("/:id", (request, response, next) => {
    const blogNewVersion = request.body
    Blog.findByIdAndUpdate(request.params.id, blogNewVersion, {new: true})
        .then(blogUpdated => {
            response.status(204).json(blogUpdated)
        })
        .catch(error => next(error))
})





module.exports = router