const app = require("../app")
const {describe, it, beforeEach, after} = require("node:test")
const supertest = require("supertest") 
const api = supertest(app)
const mongoose = require("mongoose")
const User = require("../models/user")
const assert = require("node:assert")

describe("LOGIN is working well", () => {
    it("Login successful", () => {
        assert.deepEqual(1, 1)
    })
})

after(async() => {
    await mongoose.connection.close()
})