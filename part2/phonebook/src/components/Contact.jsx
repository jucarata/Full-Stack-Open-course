const Contact = ({contact, handlerClick}) => {
    return(
        <>
            <p>
                {contact.name} {contact.number}  
                <button onClick={handlerClick}>delete</button>
            </p>
        </>
    )
}

export default Contact