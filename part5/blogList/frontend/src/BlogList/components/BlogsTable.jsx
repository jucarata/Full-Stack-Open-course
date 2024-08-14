import { BlogRow } from "./BlogRow"

export const BlogsTable = ({blogs}) => {
    

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Likes</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map(blog => <BlogRow key={blog.id} blog={blog}/>)}
            </tbody>
        </table>
    )
}