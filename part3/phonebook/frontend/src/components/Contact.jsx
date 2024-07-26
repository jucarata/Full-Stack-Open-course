import PropTypes from 'prop-types'

const Contact = ({contact, handlerClick}) => {
    return(
        <>
            <p>
                {contact.name} {contact.number}  
                <button onClick={handlerClick}>delete</button>
            </p>
        </>
    )
}

Contact.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    handlerClick: PropTypes.func.isRequired,
}

export default Contact