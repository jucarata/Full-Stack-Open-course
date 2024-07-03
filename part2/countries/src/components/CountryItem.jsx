const CountryItem = ({country, handlerClick}) => {
    return (
        <li>
            {country}
            <button onClick={handlerClick}>Show</button>
        </li>
    )
}

export default CountryItem