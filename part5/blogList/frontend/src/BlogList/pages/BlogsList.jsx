import { User } from "../components/User"
import "../styles/BlogList.css"

export const BlogsList = ({userLogged}) => {
    return (
        <div className="container">
            <User name={userLogged.name}/>
            <span>Blogs available</span>
        </div>
    )
}