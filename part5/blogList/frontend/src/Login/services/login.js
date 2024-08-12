import axios from "axios";
const baseURL = "/login"


async function login(username, password){
    const userToLogin = {username, password}
    return await axios.post(baseURL, userToLogin)
}


export default login