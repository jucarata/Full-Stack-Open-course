import "../styles/BlogList.css"
import { useEffect, useState } from "react"
import { User } from "../components/User"
import { BlogsTable } from "../components/BlogsTable"

import blogService from "../services/blogService"

export const BlogsList = ({handlerLogout}) => {
    const [userLogged, setUserLogged] = useState(null)
    const [blogs, setBlogs] = useState([{id:"hjadb112841n2mnbasd", title: "Test blog", author: {name: "Test author"}, likes: 1, url: "Any URL"}])

    useEffect(() => {
        const currentLogged = JSON.parse(window.localStorage.getItem("userLogged"))
        setUserLogged(currentLogged.user)
    }, [])

    useEffect(() => {
        async function fetchBlogs() {
            const res = await blogService.getAll()
            const data = res.data
            setBlogs(data)
        }

        fetchBlogs()
    }, [userLogged])


    return (
        <div className="blogslist">
            <button onClick={handlerLogout} className="logout-bttn">Logout</button>
            <User user={userLogged}/>
            <h3>Blogs available</h3>
            <BlogsTable blogs={blogs}/>
        </div>
    )
}