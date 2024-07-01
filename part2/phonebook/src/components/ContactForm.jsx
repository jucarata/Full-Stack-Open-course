const ContactForm = ({onSubmit, values, handlerInputs}) => {
    return(
        <>
            <form onSubmit={onSubmit}>
                <div>Name: <input value={values.name} onChange={handlerInputs.name}/></div>
                <div>Phone number: <input value={values.number} onChange={handlerInputs.number}/></div>
                <div>
                    <button type="submit">Add contact</button>
                </div>
            </form>
        </>
    )
}

export default ContactForm