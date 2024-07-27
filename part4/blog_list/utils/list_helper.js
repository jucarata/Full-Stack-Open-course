const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    if(blogs.length === 0) return 0

    const sum = (total, blog) => {
        return total += blog.likes
    }

    return blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return {}

    let mostLiked = blogs[0]

    blogs.forEach(blog => {
        if(mostLiked.likes < blog.likes){
            mostLiked = blog
        }
    })

    return mostLiked
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return {}

    let authors = []
    let blogsXAuthor = []

    blogs.forEach(blog => {
        if(authors.includes(blog.author)){
            const index = authors.indexOf(blog.author)
            blogsXAuthor[index] += 1
        } else {
            authors = authors.concat(blog.author)
            blogsXAuthor = blogsXAuthor.concat(1)
        }
    })

    const indexOfAuthor = blogsXAuthor.indexOf(Math.max(...blogsXAuthor))
    const authorMostBlogs = {author: authors[indexOfAuthor], blogs: blogsXAuthor[indexOfAuthor]}

    return authorMostBlogs
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return {}

    let authors = []
    let likesXAuthor = []

    blogs.forEach(blog => {
        if(authors.includes(blog.author)){
            const index = authors.indexOf(blog.author)
            likesXAuthor[index] += blog.likes
        } else {
            authors = authors.concat(blog.author)
            likesXAuthor = likesXAuthor.concat(blog.likes)
        }
    })

    const indexOfAuthor = likesXAuthor.indexOf(Math.max(...likesXAuthor))
    const authorMostLikes = {author: authors[indexOfAuthor], likes: likesXAuthor[indexOfAuthor]}

    return authorMostLikes
} 

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}