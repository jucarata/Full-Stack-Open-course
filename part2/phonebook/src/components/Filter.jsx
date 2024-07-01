import ContactsList from "./ContactsList"

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

export default Filter