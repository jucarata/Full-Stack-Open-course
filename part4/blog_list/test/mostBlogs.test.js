const {describe, it} = require("node:test")
const assert = require("node:assert")
const mostBlogs = require("../utils/list_helper").mostBlogs
const blogs = require("../utils/consts")


describe("To find the author who has the most blogs", () => {

    const authorWhoHasMostBlogs = mostBlogs(blogs)
    const expected = {
        author: "Robert C. Martin",
        blogs: 3
    }

    it("Most blogs", () => {
        assert.deepStrictEqual(authorWhoHasMostBlogs, expected)
    })

})