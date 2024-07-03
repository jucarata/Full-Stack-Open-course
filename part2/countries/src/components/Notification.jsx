const Notification = ({message, state}) => {
    if(state === false){return null}

    return (
        <p>{message}</p>
    )
}

export default Notification