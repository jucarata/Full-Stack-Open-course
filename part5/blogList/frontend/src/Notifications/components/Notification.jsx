import "../styles/Notification.css"

export const Notification = ({type, message}) => {
    return (
        (type === "alert")?
            <span className="alert">{message}</span>
        :
            <span className="success">{message}</span>
    )
}