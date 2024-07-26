import PropTypes from 'prop-types'

const Notification = ({body}) => {
    if (body === null) {
      return null
    }

    const {message, type} = body

    return type === 'error'?<div className="error">{message}</div>:<div className="success">{message}</div>
}

Notification.propTypes = {
  body: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })
}

export default Notification