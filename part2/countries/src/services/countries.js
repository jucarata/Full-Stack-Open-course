import axios from "axios"

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const getAll = () => {
    return axios.get(`${baseURL}/all`).then(response => response.data)
}

const getByName = (country) => {
    return axios.get(`${baseURL}/name/${country}`).then(response => response.data)
}

export default {getAll, getByName}