import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import Title from './components/Title'
import Filter from './components/Filter'
import ContactsList from './components/ContactsList'
import Notification from './components/Notification'

import contactsService from "./services/contacts"

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [textToFilter, setTextToFilter] = useState('')
  const [toShow, setToShow] = useState([])
  const [notification, setNotification] = useState(null)

  // Effect hook
  useEffect(() => {
    contactsService
      .getAll()
      .then(allContacts => setPersons(allContacts))
  }, [])


  // Functions aux
  const find = (name) => persons.find((e) => e.name === name)
  const exist = (name) => find(name) !== undefined
  const filter = (textFilter) => persons.filter((e) => e.name.toLowerCase().includes(textFilter.toLowerCase()))

  // Handlers
  const handlerADD = (event) => {
    event.preventDefault()

    if(exist(newName))
      handlerUPDATE()
    else {
      const newContact = {
        name: newName,
        number: newNumber
      }

      contactsService
        .create(newContact)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')

          const newNotification = {
            message: `Contact '${returnedContact.name}' was added`,
            type: 'success'
          }

          setNotification(newNotification)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(e => {
          const newNotification = {
            message: e.response.data.error,
            type: 'error'
          }

          setNotification(newNotification)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handlerUPDATE = () => {
    if(window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
      const contact = find(newName)
      const contactChanged = {...contact, number: newNumber}

      contactsService
        .update(contact.id, contactChanged)
        .then(contactReturned => {
          setPersons(persons.map(p => p.id != contactReturned.id? p : contactReturned))
          setNewName('')
          setNewNumber('')

          const newNotification = {
            message: `Contact '${contactReturned.name}' was updated with a new number`,
            type: 'success'
          }

          setNotification(newNotification)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(e => {
          const newNotification = {
            message: e.response.data.error,
            type: 'error'
          }

          setNotification(newNotification)
          setTimeout(() => {
            setNotification(null)
          }, 5000)

          if(newNotification.message === 'Contact has already been removed from server'){
            setPersons(persons.filter(p => p.id !== contact.id))
          }
        })
    }
  }

  const handlerDELETE = (id, contact) => {
    if(window.confirm("Do you really want to delete " + contact + "?")){
      contactsService
        .deleteContact(id)
        // eslint-disable-next-line no-unused-vars
        .then(contactDeleted => {
          setPersons(persons.filter(c => c.id !== id))

          const newNotification = {
            message: `Contact '${contact}' was deleted`,
            type: 'success'
          }

          setNotification(newNotification)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handlerNewName = (event) => {
    const currentName = event.target.value

    setNewName(currentName)
  }

  const handlerNewNumber = (event) => {
    const currrentNumber = event.target.value

    setNewNumber(currrentNumber)
  }

  const handlerFilter = (event) => {
    const currentText = event.target.value

    if(currentText !== ''){
      const contactsToShow = filter(currentText)
 
      setTextToFilter(currentText)
      setToShow(contactsToShow)
    } else {
      setTextToFilter(currentText)
      setToShow([])
    }
  }

  return (
    <div>
      <Title text={"Phonebook"}/>
      <Notification body={notification}/>
      <Filter value={textToFilter} filter={handlerFilter} toShow={toShow}/>
      <Title text={"Add a new contact:"}/>
      <ContactForm onSubmit={handlerADD} values={{name: newName, number: newNumber}} handlerInputs={{name: handlerNewName, number: handlerNewNumber}}/>
      <Title text={"Numbers"}/>
      <ContactsList contacts={persons} handlerClick={handlerDELETE}/>
    </div>
  )
}

export default App