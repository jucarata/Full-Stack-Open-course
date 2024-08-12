const {describe, it} = require("node:test")
const assert = require("node:assert")
const mostBlogs = require("../utils/list_helper").mostBlogs
const blogs = require("../utils/consts").blogs


describe("To find the author who has the most blogs", () => {

    const authorWhoHasMostBlogs = mostBlogs(blogs)
    const expected = {
        author: "66aef67c787578268b603c1c",
        blogs: 3
    }

    it("Most blogs", () => {
        assert.deepStrictEqual(authorWhoHasMostBlogs, expected)
    })

})