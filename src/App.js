import React, { useEffect } from "react"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import BaseRouter from "./Router/routes"
import Context from "./Context/context"
import "bootstrap/dist/css/bootstrap.min.css"

function App(props) {
  const [isAuth, setIsAuth] = React.useState(() => {
    return false
  })

  const [darkMode, setDarkMode] = React.useState(props.darkMode)

  const styles = {
    backgroundColor: darkMode ? "#202124" : "white",
    color: darkMode ? "white" : "black",
    borderRadius: darkMode ? "0" : "5px",
    a: {
      color: darkMode ? "white" : "black",
    },
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      setIsAuth(true)
    }
  }, [])

  return (
    <div className="main" style={styles}>
      <Context.Provider
        value={{ isAuth, setIsAuth, darkMode, setDarkMode, toggleDarkMode }}
      >
        <BrowserRouter>
          <BaseRouter darkMode={darkMode} />
        </BrowserRouter>
      </Context.Provider>
    </div>
  )
}

export default App
