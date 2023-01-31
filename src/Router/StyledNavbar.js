import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import "../App.css"
import Context from "../Context/context"
import DarkMode from "../Components/DarkMode/DarkMode"

function StyledNavbar() {
  const { isAuth, setIsAuth } = React.useContext(Context)

  let activeStyle = {
    textDecoration: "underline",
  }

  function logout() {
    setIsAuth(false)
    sessionStorage.removeItem("auth")
  }

  return (
    <>
      <DarkMode />

      <header className="header">
        <NavLink
          className="navbar__links"
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Main
        </NavLink>
        {isAuth ? (
          <NavLink
            className="navbar__links"
            to="/logout"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Logout
          </NavLink>
        ) : (
          <NavLink
            className="navbar__links"
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
        )}
        <NavLink
          className="navbar__links"
          to="/todo"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Todo
        </NavLink>
        <NavLink
          className="navbar__links"
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          About
        </NavLink>
        <NavLink
          className="navbar__links"
          to="/create"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Create Post
        </NavLink>
        <NavLink
          className="navbar__links"
          to="/order"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Order
        </NavLink>
      </header>

      <Outlet />

      <footer>footer</footer>
    </>
  )
}

export default StyledNavbar
