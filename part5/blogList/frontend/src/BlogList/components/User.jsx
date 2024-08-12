export const User = ({name}) => {
    return (
        <div className="user-profile">
            <img src="../../public/avatar.png" width={40} alt="The user-profile"/>
            <label>Logged in:</label>
            <span><b>{name}</b></span>
        </div>
    )
}