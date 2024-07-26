import ContactsList from "./ContactsList"
import PropTypes from 'prop-types'

const Filter = ({value, filter, toShow}) => {
    return (
        <>
            <form>
                <div>Filter shown with: <input value={value} onChange={filter}></input></div>
            </form>
            <ContactsList contacts={toShow}/>
        </>
    )
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    filter: PropTypes.func.isRequired,
    toShow: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired
        })
    ).isRequired,
}

export default Filter