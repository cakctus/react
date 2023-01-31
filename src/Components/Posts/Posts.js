import React, { useEffect, useReducer } from "react"
import axios from "axios"

import PostList from "./PostList"
import Loader from "../Loaders/Loader"
import Loader2 from "../Loaders/Loader"
import Select from "../Sort/Select"

const defaultState = {
  posts: [],
  loading: true,
  loading2: false,
  selectedSort: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return {
        loading: false,
        loading2: true,
        posts: [...state.posts, ...action.payload],
      }
    case "REMOVE":
      const newState = state.posts.filter((post) => post.id !== action.payload)
      return {
        posts: newState,
      }
    case "SORT":
      return {
        posts: [...state.posts].sort((a, b) => a.title.localeCompare(b.date)),
      }
    default:
      throw new Error()
  }
}

function Posts() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const [post, setPost] = React.useState("")

  const [loading2, setLoading2] = React.useState(false)

  const [currentPage, setCurrentPage] = React.useState(1)
  const [fetching, setFetching] = React.useState(true)

  const [selectedSort, setSeletedSort] = React.useState(" ")

  useEffect(() => {
    if (fetching) {
      axios
        .get(`http://127.0.0.1:8000/api/items/?page=${currentPage}`)
        .then(
          (response) => {
            if (response.status === 200) {
              setLoading2(true)
              setCurrentPage((prev) => prev + 1)
              setPost(response.data.results)
              dispatch({
                type: "SET",
                payload: [...response.data.results],
              })
            }
          },
          (error) => {
            if (error.request.status === 404) {
              setLoading2(false)
              setFetching(false)
            }
          }
        )
        .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setFetching(true)
    }
  }

  // const closeModalDispatch = () => {
  //   dispatch({ type: "CLOSE_MODAL" })
  // }

  const sortPost = (sort) => {
    setSeletedSort(sort)
    // setPost([...post].sort((a, b) => a[sort].localeCompare(b[sort])))
    setPost([...post].sort((a, b) => a.title.localeCompare(b.id)))
  }

  const sort = (value) => {
    console.log(value)
    dispatch({ type: "SORT", payload: value })
  }

  const removePost = (id) => {
    dispatch({ type: "REMOVE", payload: id })
  }

  return (
    <div>
      <Select
        options={[
          { value: "title", name: "title" },
          { value: "id", name: "id" },
        ]}
        defaultValue={"Sort by"}
        value={selectedSort}
        onChange={sortPost}
        sort={sort}
      />
      {state.loading === true ? (
        <Loader />
      ) : (
        <PostList post={state.posts} remove={removePost} />
      )}
      {loading2 && <Loader2 />}
    </div>
  )
}

export default Posts
