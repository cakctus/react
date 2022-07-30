import React from "react"
import PostItem from "./PostItem"
import { CSSTransition, TransitionGroup } from "react-transition-group"

function PostList(props) {
  return (
    <div className="App">
      <TransitionGroup className="content">
        {props.post.map((post, index) => (
          <CSSTransition key={post.id} timeout={5000} classNames="post">
            <PostItem
              post={post}
              postTogle={props.postTogle}
              remove={props.remove}
              index={index + 1}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default PostList
