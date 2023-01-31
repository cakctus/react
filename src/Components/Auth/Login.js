import React from "react"
import Context from "../../Context/context"
import { useNavigate, Outlet } from "react-router-dom"

function Login() {
  const { setIsAuth } = React.useContext(Context)

  let history = useNavigate()

  function handleClick() {
    history("/todo")
  }

  function login(event) {
    event.preventDefault()
    setIsAuth(true)
    sessionStorage.setItem("auth", "true")
  }

  return (
    <div className="App">
      Login
      <form onSubmit={login}>
        <input type="text" /> <br />
        <input type="password" /> <br />
        <button onClick={login} type="button">
          <a onClick={handleClick}>Login</a>
        </button>
      </form>
    </div>
  )
}

export default Login
