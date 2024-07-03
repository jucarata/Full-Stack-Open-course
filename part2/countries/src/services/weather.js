import axios from "axios";

const exclude = "hourly,daily"
const API_KEY = import.meta.env.VITE_WEATHER_KEY


const getCurrentWeather = (lat, lon) => {
    return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(response => response.data)
}

export default {getCurrentWeather}