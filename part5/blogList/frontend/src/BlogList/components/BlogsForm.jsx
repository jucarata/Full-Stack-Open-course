export const BlogsForms = ({handlerSubmit}) => {
    return (
        <div className="blogs-form">
           <span><b>CREATE A NEW BLOG</b></span>
           <div className="blog-form">
                <form onSubmit={handlerSubmit}>
                        <input name="title" placeholder="name" required></input>
                        <input name="likes" type="number" min={0} placeholder="likes" required></input>
                        <input name="url" type="url" placeholder="URL" required></input>
                        <button>ADD BLOG</button>
                </form>
           </div>
        </div>
    )
}