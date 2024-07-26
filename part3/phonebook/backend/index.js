const express = require("express")
const app = express()
require('dotenv').config()

const cors = require("cors")
const morgan = require("morgan")
const Contact = require("./models/contacts")

app.use(express.json())
app.use(cors())
app.use(express.static('dist'));


morgan.token("resBody", (request) => (request.method === 'POST')?JSON.stringify(request.body):'')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :resBody'))


let contacts = []

const getAll = () => {
  return Contact.find({}).then(contactsReturned => contactsReturned.map(contact => contact.toJSON()))
}

//Middleware to handler errors
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error instanceof TypeError) {
    return response.status(400).json({ error: 'Contact has already been removed from server' });
  }

  next(error)
}


/*
      || ROUTES ||
*/


//GET (ALL)
app.get("/api/persons", (request, response) => {
    getAll().then(contactsReturned => {
      contacts = contactsReturned
      response.json(contactsReturned)
    })
})

//GET (INFO)
app.get("/info", (request, response) => { 
    if(contacts.length === 0){
      getAll().then(contactsReturned => {
        const totalContacts = `<p>Phonebook has info for ${contactsReturned.length} persons<p/>`
        const date = `<p>${new Date()}<p/>`
        const info = `<div>${totalContacts}${date}<div/>`

        contacts = contactsReturned
        return response.send(info)
      })
    } else {
      const totalContacts = `<p>Phonebook has info for ${contacts.length} persons<p/>`
      const date = `<p>${new Date()}<p/>`
      const info = `<div>${totalContacts}${date}<div/>`
      
      return response.send(info)
    }
})

//GET (ELEMENT)
app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Contact.findById(id)
      .then(contactReturned => {
        return (contactReturned)? 
          response.json(contactReturned) 
          : response.status(404).json({ error: 'Not Found' })
      })
      .catch(error => next(error))
})

//POST
app.post("/api/persons", (request, response, next) => {
    const contact = request.body
    const found = contacts.find(c => c.name === contact.name)

    if(!contact.name && !contact.number){
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    if(found){
      return response.status(409).json({ 
        error: 'Contact already exists' 
      })
    }


    const newContact = new Contact({
      name: contact.name, 
      number: contact.number
    })

    newContact.save()
      .then(contactReturned => {
        contacts = contacts.concat(contactReturned.toJSON())
        response.status(201).json(contactReturned)
      })
      .catch(error => next(error))
})

//DELETE
app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Contact.findByIdAndDelete(id)
      .then(contactReturned => {
        contacts = contacts.filter(c => c.id !== id)
        response.status(204).end()
      })
      .catch(error => next(error))
})

//PUT
app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndUpdate(id, request.body, {new: true, runValidators: true, context: 'query'})
    .then(contactUpdated => {
      if (!contactUpdated) {throw new TypeError('Cannot read properties of null (reading \'id\')')}

      contacts = contacts.map(contact => (contact.id !== id)? contact : contactUpdated.toJSON())

      response.json(contactUpdated)
    })
    .catch(error => {
      next(error)
    })
})

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server is running in " + PORT)
})