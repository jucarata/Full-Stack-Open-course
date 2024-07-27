const {describe, it} = require("node:test")
const assert = require("node:assert")
const favoriteBlog = require("../utils/list_helper").favoriteBlog
const blogs = require("../utils/consts")

describe("To find what is the most liked blog (favorite blog)", () => {

    const favorite = favoriteBlog(blogs)
    const expected = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }

    it("Favorite blog", () => {
        assert.deepStrictEqual(favorite, expected)
    })

})