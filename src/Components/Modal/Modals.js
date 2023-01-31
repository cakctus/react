import React, { useState } from "react"

import Modal from "./Modal"
import Form from "../Forms/Form"
import FormAPI from "../Forms/FormAPI"

function Modals() {
  const [modal, setModal] = useState(false)

  const [post, setPost] = React.useState([])

  const [title, setTitle] = React.useState("")
  const [newPost, setNewPost] = React.useState({ title: "" })

  const objCreate = (e) => {
    const name = e.target.name
    const value = e.target.value
    setNewPost({ ...newPost, [name]: value })
  }

  const newPostFunction = (e) => {
    e.preventDefault()

    if (newPost.title) {
      const nPost = { id: new Date().getTime().toString(), ...newPost }
      setPost([...post, { ...newPost, nPost }])
    }
    if (title) {
      const n = { id: Date.now(), title: title, completed: false }
      setPost([...post, n])
    }

    setTitle("")
    setNewPost({ title: "" })
  }

  const createPost = (newPost) => {
    setPost([...post, newPost])
  }

  function openModal() {
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  return (
    <div>
      <button
        onClick={openModal}
        style={{ marginRight: 10, borderRadius: 10, textAlign: "center" }}
      >
        Create post
      </button>
      {modal && (
        <Modal setVisible={setModal}>
          <form>
            <input
              type="text"
              value={title}
              placeholder="title"
              onChange={(value) => setTitle(value.target.value)}
            ></input>{" "}
            <br />
            <input
              type="text"
              value={newPost.title}
              id="title"
              name="title"
              placeholder="obj"
              onChange={objCreate}
            ></input>{" "}
            <br />
          </form>
          <button onClick={newPostFunction}>Create</button>
          <hr />
          <Form create={createPost} />
          <hr />
          <FormAPI requestType="post" btnText="Create" /> <br />
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  )
}

export default Modals
