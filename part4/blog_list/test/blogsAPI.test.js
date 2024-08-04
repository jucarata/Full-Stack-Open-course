const app = require("../app")
const {describe, it, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const mongoose = require("mongoose")
const api = supertest(app)

const {blogsFormatter} = require("../utils/formatter")

//Schemas
const Blog = require("../models/blog")

//Constants
const blogs = require("../utils/consts").blogs
const userForLogin = require("../utils/consts").userForLogin

//ROUTES
const BASE_URL = "/api/blogs"
const LOGIN_URL = "/login"


describe("BLOGS API is working well", async() => {

    const response = await api.post(LOGIN_URL).send(userForLogin)
    const {token, username, name} = response.body
    const authorization = `Bearer ${token}`

    beforeEach(async() => {
        await Blog.deleteMany({})
        await Blog.insertMany(blogs)
    })
    
    it('token is missing', async () => {
        const newBlog = {
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)",
            url: "A URL",
            likes: 15
        }
    
        await api.post(BASE_URL).send(newBlog).expect(401)
    })

    it('blogs are returned as json', async () => {
        await api
          .get(BASE_URL)
          .set('Authorization', authorization)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    it('All blogs saved are returned', async () => {
        const response = await api.get(BASE_URL).set('Authorization', authorization)
        const blogsReturned = response.body
        
        const blogsExpected = blogsFormatter(blogs)
        const realBlogs = blogsFormatter(blogsReturned)
    
        assert.deepStrictEqual(realBlogs, blogsExpected)
    })
    
    it('A blog is saved', async () => {
        const newBlog = {
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)",
            url: "A URL",
            likes: 15
        }
    
        await api.post(BASE_URL).set('Authorization', authorization).send(newBlog)
        const response = await api.get(BASE_URL).set('Authorization', authorization)
        const blogsReturned = response.body
    
        assert.strictEqual(blogsReturned.length, blogs.length + 1)
    })
    
    it('Likes are missed, default value is zero likes', async () => {
        const newBlog = {
            _id: "5a422a518b54a676432d17f7",
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)",
            url: "A URL",
        }
    
        await api.post(BASE_URL).set('Authorization', authorization).send(newBlog)
        const response = await api.get(`${BASE_URL}/5a422a518b54a676432d17f7`).set('Authorization', authorization)
        const blogsReturned = response.body
    
        assert.strictEqual(blogsReturned.likes, 0)
    })
    
    it('Content are missing, (title or url)', async () => {
        const newBlog = {
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "JuanK (Me)"
        }
    
        await api.post(BASE_URL).set('Authorization', authorization).send(newBlog).expect(400)
    })

    it('only the creator can delete their blogs', async () => {
        const newBlog = {
            title: "JuanK isn't a blogs author, but it's a developer",
            author: "Will be jucarata (Juan Camilo Ramirez Tabares)",
            url: "www.juankislearningjavascript.com",
            likes: 21
        }

        //Blog is created by jucarata (Juan Camilo Ramirez Tabares)
        const res = await api.post(BASE_URL).set('Authorization', authorization).send(newBlog).expect(201)
        const blogSaved = res.body
        const blogID = blogSaved.id

        //Now I'm gonna log in with other user
        const iamnotthecreator = {username: "robertin", password: "12345 isnt a good pass, you must change it"}
        const response = await api.post(LOGIN_URL).send(iamnotthecreator)
        const {token, username, name} = response.body
        const newAuthorizationToken = `Bearer ${token}`
        //I'm gonna try to delete the blog with robertin
        await api.delete(`${BASE_URL}/${blogID}`).set('Authorization', newAuthorizationToken).expect(403)
    })
})

after(async() => {
    await mongoose.connection.close()
})