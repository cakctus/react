import React from "react";
import {Link, useNavigate } from 'react-router-dom'
import '../App.css';



function PostItem({post, postTogle, remove}) {
  const router = useNavigate()

  function handleClick() {
    router(`/todo/${post.id}`)
  }

  if (post.completed === true) {
    var classs = 'done'
  }
  
  return (
  <div className="App">

    <div className='content'>
      {post.id} <br/>
      <span className={classs} >
      <input type="checkbox" id="post.id" name="post.id" onClick={() => postTogle(post.id)}  /> 
      {post.title} <br/> 
      </span>
      <button style={{color: 'blue'}}  onClick={handleClick}> Open </button>
      <Link to={`/todo/${post.id}`}>more info</Link>
      <button style={{color: 'red'}} onClick={() => remove(post.id)}> Delete </button> <br/> <hr/>
    </div>

  </div>
  )
}

export default PostItem;