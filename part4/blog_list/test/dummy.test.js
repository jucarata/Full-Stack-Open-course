const {describe, it} = require("node:test")
const assert = require("node:assert")
const dummy = require("../utils/list_helper").dummy

describe("Dummy test", () => {
    it("Just a simple test", () => {
        assert.strictEqual(dummy([]), 1)
    })
})