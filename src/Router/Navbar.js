import React from "react"
import { BrowserRouter, Link, Outlet } from "react-router-dom"
import "../App.css"
import Context from "../Context/context"

function Navbar() {
  const { isAuth, setIsAuth } = React.useContext(Context)

  function logout() {
    setIsAuth(false)
    sessionStorage.removeItem("auth")
  }

  return (
    <>
      <header>
        {isAuth === true ? (
          <a className="navbar__links logout" onClick={logout}>
            Logout
          </a>
        ) : (
          <Link className="navbar__links" to="/">
            Main
          </Link>
        )}
        <Link className="navbar__links" to="/login">
          Login
        </Link>
        <Link className="navbar__links" to="/todo">
          Todo
        </Link>
        <Link className="navbar__links" to="/about">
          About
        </Link>
        <Link className="navbar__links" to="/create">
          Create Post
        </Link>
        <Link className="navbar__links" to="/order">
          Order
        </Link>
      </header>

      <Outlet />

      <footer>footer</footer>
    </>
  )
}

export default Navbar
