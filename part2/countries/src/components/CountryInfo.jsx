import { useEffect, useState } from "react"
import WeatherInfo from "./WeatherInfo"
import weatherService from "../services/weather"

const CountryInfo = ({country}) => {
    
    useEffect(() => {
        if(country){
            const [lat, lon] = country.capitalInfo.latlng
            weatherService 
                .getCurrentWeather(lat, lon)
                .then(response => setWeather(response))
        }
    }, [country])
    

    const [weather, setWeather] = useState(null)
    
    if(country === null){return null}
    
    return (
        <>
            <h1>{country.name.official}</h1>
            <div>
                <p><b>Capital:</b> {country.capital}</p>
                <p><b>Area:</b> {country.area} km^2</p>
                <div>
                    <p><b>Languages:</b></p>
                    <ul>
                        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.flags.alt}/>
                <WeatherInfo capital={country.capital} weather={weather}/>
                
            </div>
        </>
    )
}

export default CountryInfo