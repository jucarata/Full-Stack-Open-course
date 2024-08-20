import "../styles/BlogList.css"
import { useEffect, useState } from "react"

//Components
import { User } from "../components/User"
import { BlogsTable } from "../components/BlogsTable"
import { BlogsForms } from "../components/BlogsForm"
import { Notification } from "../../Notifications/components/Notification"

//Services
import blogService from "../services/blogService"

export const BlogsList = ({handlerLogout}) => {
    //Consts to test
    const userTest = {username: "Test Username", name: "test name"}

    //App States
    const [userLogged, setUserLogged] = useState(userTest)
    const [blogs, setBlogs] = useState([])

    //Notification
    const [notification, setNotification] = useState(false)
    const [message, setMessage] = useState("")

    function addBlogsHandler(event) {
        event.preventDefault()

        const {title, likes, url} = event.target.elements
        const newUser = {title: title.value, likes: likes.value, url: url.value}
        blogService.post(newUser).then(response => {
            const userCreated = {...response.data, author: {name: userLogged.name}}
            setBlogs(prev => prev.concat(userCreated))

            title.value = ""
            likes.value = ""
            url.value = ""

            setMessage("The new blog has been added")
            setNotification(true)

            setTimeout(() => {
                setMessage("")
                setNotification(false)
            }, 2000)
        })
    } 

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
        <div className="global-style">
            {notification && <Notification message={message} />}
            <button onClick={handlerLogout} className="logout-bttn">Logout</button>
            <User user={userLogged}/>
            <div className="bodyBlogsList">
                <BlogsForms handlerSubmit={addBlogsHandler}/>
                <BlogsTable blogs={blogs}/>
            </div>
        </div>
    )
}