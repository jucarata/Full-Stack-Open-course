import { useState } from "react"
import { LoginForm } from "../components/LoginForm"
import "../styles/Login.css"

export const Login = ({handlerLogin}) => {
    return (
        <div className="login">
            <h2>Login</h2>
            <LoginForm handlerLogin={handlerLogin}/>
        </div>
    )

}