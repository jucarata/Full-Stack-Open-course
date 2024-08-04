const {describe, it} = require("node:test")
const assert = require("node:assert")
const mostLikes = require("../utils/list_helper").mostLikes
const blogs = require("../utils/consts").blogs


describe("To find the author who has the most likes (Total likes)", () => {

    const authorWhoHasMostLikes = mostLikes(blogs)
    const expected = {
        author: "66aef65b787578268b603c1a",
        likes: 17
    }

    it("Most Liked author", () => {
        assert.deepStrictEqual(authorWhoHasMostLikes, expected)
    })

})