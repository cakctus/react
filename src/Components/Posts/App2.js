import React from "react"

import Posts from "./Posts"
import Modals from "../Modal/Modals"

function App() {
  const [post, setPost] = React.useState([])

  return (
    <div className="App">
      <Modals post={post} />
      <Posts />
    </div>
  )
}

export default App
