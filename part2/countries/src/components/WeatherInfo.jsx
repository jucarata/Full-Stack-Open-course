const WeatherInfo = ({capital, weather}) => {

    if(!weather){return null}

    return (
        <>
            <h2>Weather in {capital}</h2>
            <p><b>Temperature:</b> {weather.main.temp} celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p><b>Winds:</b> {weather.wind.speed} m/s</p>
        </>
    )
}

export default WeatherInfo