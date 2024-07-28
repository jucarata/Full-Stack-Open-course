const app = require("../app")
const {describe, it, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest") 
const api = supertest(app)
const Blog = require("../models/blog")
const blogs = require("../utils/consts") 
const mongoose = require("mongoose")
const BASE_URL = "/api/blogs"

describe.only("HTTP METHODS", () => {
    beforeEach(async() => {
        await Blog.deleteMany({})
        await Blog.insertMany(blogs)
    })
    
    it.only('blogs are returned as json', async () => {
        await api
          .get(BASE_URL)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    it.only('All blogs saved are returned', async () => {
        const response = await api.get(BASE_URL)
        const blogsReturned = response.body
        const blogsFormated = blogs.map(blog => {
            return {
                id: blog._id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes,
            }
        })
    
        assert.deepStrictEqual(blogsReturned, blogsFormated)
    })
    
    it.only('A blog is saved', async () => {
        const newBlog = {
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)",
            url: "A URL",
            likes: 15
        }
    
        await api.post(BASE_URL).send(newBlog)
        const response = await api.get(BASE_URL)
        const blogsReturned = response.body
    
        assert.strictEqual(blogsReturned.length, blogs.length + 1)
    })
    
    it.only('Likes are missed, default value is zero likes', async () => {
        const newBlog = {
            _id: "5a422a518b54a676432d17f7",
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)",
            url: "A URL",
        }
    
        await api.post(BASE_URL).send(newBlog)
        const response = await api.get(`${BASE_URL}/5a422a518b54a676432d17f7`)
        const blogsReturned = response.body
    
        assert.strictEqual(blogsReturned.likes, 0)
    })
    
    it.only('Content are missing, (title or url)', async () => {
        const newBlog = {
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)"
        }
    
        await api.post(BASE_URL).send(newBlog).expect(400)
    })
})

after(async() => {
    await mongoose.connection.close()
})