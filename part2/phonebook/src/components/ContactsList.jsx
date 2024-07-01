import Contact from "./Contact"

const ContactsList = ({contacts, handlerClick}) => {
    return (
        <>
            {contacts.map((person) => <Contact key={person.id} contact={person} handlerClick={() => handlerClick(person.id, person.name)}/>)}
        </>
    )
}

export default ContactsList