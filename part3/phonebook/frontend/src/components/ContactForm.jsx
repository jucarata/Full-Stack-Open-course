import PropTypes from 'prop-types'

const ContactForm = ({onSubmit, values, handlerInputs}) => {
    return(
        <>
            <form onSubmit={onSubmit}>
                <div>Name: <input value={values.name} onChange={handlerInputs.name}/></div>
                <div>Phone number: <input value={values.number} onChange={handlerInputs.number}/></div>
                <div>
                    <button type="submit">Add contact</button>
                </div>
            </form>
        </>
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,

    values: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,

    handlerInputs: PropTypes.shape({
        name: PropTypes.func.isRequired,
        number: PropTypes.func.isRequired,
    }).isRequired
}

export default ContactForm