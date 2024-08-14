export const BlogRow = ({blog}) => {

  return (
    <tr key={blog.id}>
      <td>{blog.title}</td>
      <td>{blog.author.name}</td>
      <td>{blog.likes}</td>
      <td>{blog.url}</td>
    </tr>
  )
}