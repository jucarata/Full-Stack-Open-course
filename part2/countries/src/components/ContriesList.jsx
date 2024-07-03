import CountryItem from "./CountryItem";

const CountriesList = ({countries, handlerSelectItem}) => {
    if(!countries){
        return null
    }

    return countries.map(country => 
        <CountryItem key={country.id} country={country.name} handlerClick={() => handlerSelectItem(country.lowerName)}/>
    )
}

export default CountriesList