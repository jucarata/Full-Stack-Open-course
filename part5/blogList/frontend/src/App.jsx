import { useState, useEffect } from 'react'

// Services
import login from './Login/services/login'

//Pages
import { Login } from './Login/pages/Login'
import { BlogsList } from './BlogList/pages/BlogsList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [tokenAble, setTokenAble] = useState(null)

  /* useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []) */

  async function handlerLogin(event){
    event.preventDefault()
    const {user, password} = event.target.elements
    try {
      const res = await login(user.value, password.value)
      const {token, username, name} = res.data
      setUser({username, name})
      setTokenAble(token)
    } catch (error) {
      console.error("Caught an error:", error)
      window.alert("Unauthorized")
    }
  }

  return (
    <main>
      <header className='header'>
        <span>Welcome to <b className='title'>Blogs List</b></span>
      </header>
      {/* Conditional render */}
      {(!user)? <Login handlerLogin={handlerLogin}/> :  <BlogsList userLogged={user}/>} 
    </main>
  )
}

export default App