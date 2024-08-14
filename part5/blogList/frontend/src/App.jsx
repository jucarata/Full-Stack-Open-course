import { useState, useEffect } from 'react'

// Services
import login from './Login/services/login'

//Pages
import { Login } from './Login/pages/Login'
import { BlogsList } from './BlogList/pages/BlogsList'

const App = () => {
  const [user, setUser] = useState(null)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
      window.localStorage.clear()
  }, [])

  async function handlerLogin(event){
    event.preventDefault()
    const {user, password} = event.target.elements
    try {
      const res = await login(user.value, password.value)
      const {token, username, name} = res.data
      setUser({username, name})
      setIsLogged(!isLogged)

      window.localStorage.setItem("userLogged", JSON.stringify({token, user: {username, name}}))
    } catch (error) {
      console.error("Caught an error:", error)
      window.alert("Unauthorized")
    }
  }

  function handlerLogOut(){
    setIsLogged(!isLogged)
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <main>
      <header className='header'>
        <span>Welcome to <b className='title'>Blogs List</b></span>
      </header>
      {/* Conditional render */}
      <div>
        {(!isLogged)? <Login handlerLogin={handlerLogin}/> :  <BlogsList handlerLogout={handlerLogOut}/>} 
      </div>
    </main>
  )
}

export default App