import React from "react"
import FormAPI from "./FormAPI"

function Create() {
  return (
    <div className="App">
      <FormAPI requestType="post" btnText="create" />
    </div>
  )
}

export default Create
