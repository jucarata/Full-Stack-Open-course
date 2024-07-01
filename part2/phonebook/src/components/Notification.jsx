const Notification = ({body}) => {
    if (body === null) {
      return null
    }

    const {message, type} = body

    return type === 'error'?<div className="error">{message}</div>:<div className="success">{message}</div>
}

export default Notification