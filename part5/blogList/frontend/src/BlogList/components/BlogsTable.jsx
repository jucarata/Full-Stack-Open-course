import { BlogRow } from "./BlogRow"

export const BlogsTable = ({blogs}) => {
    

    return (
        <div className="blogs-table">
            <h3>Blogs available</h3>
            <div className="table">
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
            </div>
        </div>
    )
}