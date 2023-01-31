import React from "react"
import Context from "../../Context/context"

function DarkMode() {
  const { darkMode, setDarkMode, toggleDarkMode } = React.useContext(Context)

  //function toggleDarkMode() {
  //setDarkMode(!darkMode)
  //}

  return (
    <div className="darkMode">
      <button onClick={toggleDarkMode}>{darkMode ? "white" : "dark"}</button>
    </div>
  )
}

export default DarkMode
