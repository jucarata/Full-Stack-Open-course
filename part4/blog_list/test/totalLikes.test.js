const {describe, it} = require("node:test")
const assert = require("node:assert")
const totalLikes = require("../utils/list_helper").totalLikes
const blogs = require("../utils/consts")

describe("Total likes", () => {

    it("of empty blog list is zero", () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    it("when blog list has only one blog", () => {
        const blog = [{
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }]

        assert.strictEqual(totalLikes(blog), 7)
    })

    it("of a bigger list is calculated right", () => {
        assert.strictEqual(totalLikes(blogs), 36)
    })
})