import axios from 'axios'
const baseUrl = '/api/blogs'


function getAuthorization() {
  const currentUser = JSON.parse(window.localStorage.getItem("userLogged"))
  const token = currentUser.token

  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

async function getAll() {
  const config = getAuthorization()
  return await axios.get(baseUrl, config)
}

export default { getAll }