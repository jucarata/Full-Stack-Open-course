const blogsFormatter = (blogs) => {
    return blogs.map(blog => {
        return {
            id: (blog._id)? blog._id : blog.id,
            title: blog.title,
            author: (blog.author instanceof Object)? blog.author.id : blog.author,
            url: blog.url,
            likes: blog.likes,
        }
    })
}

const usersFormatter = () => {

}


module.exports = {blogsFormatter, usersFormatter}