import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const create = (newContact) => {
    return axios.post(baseURL, newContact).then(response => response.data)
}

const update = (id, contactChanged) => {
    return axios.put(`${baseURL}/${id}`, contactChanged).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

export default {getAll, create, update, deleteContact}