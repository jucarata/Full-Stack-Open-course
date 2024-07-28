const Blog = require("../models/blog")
const blogs = require("../utils/consts") 

const post = () => {
    
}

const getAll = async() => {
    return await Blog.find({})
}


module.exports = {getAll}
