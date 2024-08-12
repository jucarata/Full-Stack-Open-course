const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const {describe, it, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const api = supertest(app)
const User = require("../models/user")
const users = require("../utils/consts").users


const BASE_URL = "/users"

describe("USERS API is working well", () => {

    describe("An User must be", () => {

        beforeEach(async() => {
            await User.deleteMany({})
            await User.insertMany(users)
        })

        it("User must not be empty or has content missing", async() => {
            const newUser = {}
    
            await api.post(BASE_URL).send(newUser).expect(400)
        })

        it("Password must be longer than 3 chars", async() => {
            const newUser = {
                username: "jucara",
                password: "it",
                name: "A simple user name"
            }
    
            await api.post(BASE_URL).send(newUser).expect(400)
        })

        it("Username must be longer than 3 chars", async() => {
            const newUser = {
                username: "ju",
                password: "th0s3c0uldb34600dp4$$",
                name: "A simple user name"
            }
    
            await api.post(BASE_URL).send(newUser).expect(400)
        })

        it("Username must be unique", async() => {
            const newUser = {
                username: "jucarata", //This user is previous created in the beforeEach and it's taken from the const users 
                password: "th0s3c0uldb34600dp4$$",
                name: "A simple user name"
            }
    
            await api.post(BASE_URL).send(newUser).expect(400)
        })

        it("A valid user is", async() => {
            const newUser = {
                username: "jucara",
                password: "12345 isnt a good pass, you must change it",
                name: "Juan Camilo Ramirez"
            }
    
            await api.post(BASE_URL).send(newUser).expect(201)
            const response = await api.get(BASE_URL)
            const usersReturned = response.body

            assert.strictEqual(usersReturned.length, users.length + 1)
        })
       
    })
})

after(async() => {
    await mongoose.connection.close()
})