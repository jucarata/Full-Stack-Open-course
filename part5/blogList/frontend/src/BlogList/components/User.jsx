export const User = ({user}) => {
    if(!user){return}

    return (
        <div className="user-profile">
            <span><b>Logged in: </b>{user.name}</span>
        </div>
    )
}