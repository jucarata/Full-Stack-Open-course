import Contact from "./Contact"
import PropTypes from 'prop-types'

const ContactsList = ({contacts, handlerClick}) => {
    return (
        <>
            {contacts.map((person) => <Contact key={person.id} contact={person} handlerClick={() => handlerClick(person.id, person.name)}/>)}
        </>
    )
}

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired
        })
    ).isRequired,
    handlerClick: PropTypes.func
}

export default ContactsList