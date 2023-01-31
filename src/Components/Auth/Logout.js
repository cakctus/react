import React from "react"
import Context from "../../Context/context"

function Logout() {
  const { isAuth, setIsAuth } = React.useContext(Context)

  function logout() {
    setIsAuth(false)
    sessionStorage.removeItem("auth")
  }

  return (
    <div className="App">
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Logout
