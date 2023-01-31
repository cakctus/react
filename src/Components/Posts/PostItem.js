import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../App.css"

function PostItem({ post, postTogle, remove }) {
  const [style, setStyle] = React.useState(false)
  const router = useNavigate()

  function handleClick() {
    router(`/todo/${post.id}`)
  }

  // if (post.completed === true) {
  //   var classs = "done"
  // }

  function postTogle(id) {
    if (post.id === id) {
      setStyle(!style)
    }
  }
  return (
    <div className="App">
      <div className="content">
        {post.id} <br />
        <span className={style ? "done" : "f"}>
          <input
            type="checkbox"
            id="post.id"
            name="post.id"
            onClick={() => postTogle(post.id)}
          />
          {post.title} <br />
        </span>
        <button style={{ color: "blue" }} onClick={handleClick}>
          {" "}
          Open{" "}
        </button>
        <Link to={`/todo/${post.id}`}>more info</Link>
        <button style={{ color: "red" }} onClick={() => remove(post.id)}>
          Delete!
        </button>{" "}
        <br /> <hr />
      </div>
    </div>
  )
}

export default PostItem
