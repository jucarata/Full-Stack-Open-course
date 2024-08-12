export const LoginForm = ({handlerLogin}) => {
    return (
        <form onSubmit={handlerLogin}>
            <div>
                <input name="user" placeholder="Username" required></input>
            </div>
            <div>
                <input type="password" name="password" placeholder="Password" required></input>
            </div>
            <button type="submit">Log In</button>
        </form>
    )
}