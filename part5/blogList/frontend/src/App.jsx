import { useState, useEffect } from 'react'

//Components
import { Notification } from './Notifications/components/Notification'

// Services
import login from './Login/services/login'

//Pages
import { Login } from './Login/pages/Login'
import { BlogsList } from './BlogList/pages/BlogsList'

const App = () => {
  const [isLogged, setIsLogged] = useState(false)

  const [notification, setNotification] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
      window.localStorage.clear()
  }, [])

  async function handlerLogin(event){
    event.preventDefault()
    const {user, password} = event.target.elements
    try {
      const res = await login(user.value, password.value)
      const {token, username, name} = res.data
      setIsLogged(!isLogged)

      window.localStorage.setItem("userLogged", JSON.stringify({token, user: {username, name}}))
    } catch (error) {
      console.error("Caught an error:", error)
      setMessage(error.response.data.error)
      setNotification(true)

      setTimeout(() => {
        setMessage("")
        setNotification(false)
      }, 2000)
    }
  }

  function handlerLogOut(){
    setIsLogged(!isLogged)
    window.localStorage.clear()
  }

  return (
    <main>
      <header className='header'>
        <span>Welcome to <b className='title'>BLOGS LIST</b></span>
      </header>
      {/* Conditional render */}
      <div className='body'>
        {notification && <Notification type={"alert"} message={message}/>}
        {(!isLogged)? <Login handlerLogin={handlerLogin}/> :  <BlogsList handlerLogout={handlerLogOut}/>} 
      </div>
    </main>
  )
}

export default App