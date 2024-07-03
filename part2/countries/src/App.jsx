import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import CountriesList from "./components/ContriesList"
import Notification from "./components/Notification"
import CountryInfo from "./components/CountryInfo"

import countriesService from "./services/countries"

function App() {

  const [value, setValue] = useState("")
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState([])
  const [countrySelected, setCountrySelected] = useState(null)
  
  //Notification state
  const [notification, setNotification] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        const c = response.map((country, i) => {return {id: i, name: country.name.common, lowerName: country.name.common.toLowerCase()}})
        setCountries(countries.concat(c))
      })
  },[])

  const filter = (country) => countries.filter(c => c.lowerName.includes(country.toLowerCase()))

  const handlerSearch = (event) => {
      const newValue = event.target.value
      setValue(newValue)
      setCountrySelected(null)
      setToShow(null)
      setNotification(false)

      if(newValue !== ''){
        const filteredCountries = filter(newValue)

        if(filteredCountries.length > 10){
          setMessage("Too many matches, specify another filter")
          setNotification(true)
        } else if(filteredCountries.length > 1){
          setToShow(filteredCountries)
        } else if(filteredCountries.length == 1){
          const nameCountry = filteredCountries[0].lowerName
          countriesService
            .getByName(nameCountry)
            .then(response => setCountrySelected(response))
        } else{
          setNotification(true)
          setMessage("The country could not be found, please specify another filter")
        }
      }
  }

  const handlerShow = (country) => {
    countriesService
      .getByName(country)
      .then(response => setCountrySelected(response))
  }

  return (
    <>
      <Filter value={value} onChange={handlerSearch}/>
      <Notification message={message} state={notification}/>
      <CountriesList countries={toShow} handlerSelectItem={handlerShow}/>
      <CountryInfo country={countrySelected}/>
    </>
  )
}

export default App
