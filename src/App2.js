import React, { useEffect, useReducer } from "react"
import Posts from "./Components/Posts/Posts"
import Value from "./Components/Value"
import PostList from "./Components/Posts/PostList"
import Form from "./Components/Form"
import Select from "./Components/Select"
import Modal from "./Components/Modal"
import Button from "./Components/Button"
import axios from "axios"
import Loader from "./Components/Loader"
import Loader2 from "./Components/Loader"
import "./App.css"
import FormAPI from "./Components/FormAPI"

const defaultState = {
  posts: [],
  loading: true,
  loading2: false,
}

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return {
        loading: false,
        loading2: true,
        posts: [...state.posts, ...action.payload],
      }
    default:
      throw new Error()
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  console.log(state.posts)

  const [post, setPost] = React.useState([])

  const [title, setTitle] = React.useState("")
  const [newPost, setNewPost] = React.useState({ title: "" })

  const [selectedSort, setSeletedSort] = React.useState(" ")

  const [modal, setModal] = React.useState(false)

  const [loading, setLoading] = React.useState(true)
  const [loading2, setLoading2] = React.useState(false)
  const [endloading, setEndLoading] = React.useState(false)

  const [currentPage, setCurrentPage] = React.useState(1)
  const [fetching, setFetching] = React.useState(true)
  const [totalItem, setTotalItem] = React.useState(0)

  const [totalPage, setTotalPage] = React.useState(0)
  const [slimit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  let pageArray = []
  for (let i = 0; i < totalPage; i++) {
    pageArray.push(i + 1)
  }

  const getTotalCount = (totalCount, slimit) => {
    return Math.ceil(totalCount / slimit)
  }

  useEffect(() => {
    if (fetching) {
      //axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
      axios
        .get(`http://127.0.0.1:8000/api/items/?page=${currentPage}`)
        .then(
          (response) => {
            if (response.status === 200) {
              // setLoading(false)
              setLoading2(true)
              // setPost([...post, ...response.data.results])
              setTotalItem(response.data.count)
              setCurrentPage((prev) => prev + 1)
              dispatch({
                type: "set",
                payload: [...response.data.results],
              })
              //setTotalItem(response.headers['x-total-count'])
              //const totalCount = response.headers['x-total-count']
              //const totalCount = response.data.length
              //setTotalPage(getTotalCount(totalCount, slimit))
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

  const objCreate = (e) => {
    const name = e.target.name
    const value = e.target.value
    setNewPost({ ...newPost, [name]: value })
  }

  const newPostFunction = (e) => {
    e.preventDefault()

    if (newPost.title) {
      const nPost = { ...newPost, id: new Date().getTime().toString() }
      setPost([...post, { ...newPost, nPost }])
    }
    if (title) {
      const n = { id: Date.now(), title: title, completed: false }
      setPost([...post, n])
    }

    setTitle("")
    setNewPost({ title: "" })
  }

  const sortPost = (sort) => {
    setSeletedSort(sort)
    //setPost([...post].sort((a,b) => a[sort].localeCompare(b[sort])))
    setPost([...post].sort((a, b) => a.title.localeCompare(b.date)))
  }

  const changePage = (page) => {
    setPage(page)
  }

  const createPost = (newPost) => {
    setPost([...post, newPost])
  }

  const removePost = (id) => {
    setPost(post.filter((todo) => todo.id !== id))
  }

  function postTogle(id) {
    setPost(
      post.map((post) => {
        if (post.id === id) {
          post.completed = !post.completed
        }
        return post
      })
    )
  }

  function openModal() {
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    //if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight < 100 && post.length > totalItem) {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setFetching(true)
    }
    //console.log('clientWidth',  e.target.documentElement.clientWidth)  // page clientWidth
    //console.log('clientHeigh',  e.target.documentElement.clientHeight)  // page clientWidth
    //console.log('clientTop', e.target.documentElement.clientTop) // page clientTop
    //console.log('clientLeft', e.target.documentElement.clientLeft) // page clientTop

    //console.log('inner width', window.innerWidth)  // page width
    //console.log('inner width', window.innerWidth)  // page width

    //console.log('outer width', window.outerWidth) // page height
    //console.log('outer height', window.outerHeight) // page height

    //console.log('offsetWidth',  e.target.documentElement.offsetWidth)
    //console.log('offsetHeight', e.target.documentElement.offsetHeight)

    //console.log(e.target.documentElement.scrollTop)
    //console.log('scroll Width', e.target.documentElement.scrollWidth) // total
    //console.log('scroll Height', e.target.documentElement.scrollHeight) // total
    //console.log('scroll Top', e.target.documentElement.scrollTop) // current

    //console.log('----------------')

    //console.log(e.target.documentElement.clientHeight )
    //console.log(e.target.documentElement.offsetHeight )
    //console.log(e.target.documentElement.scrollHeight )

    //console.log(window.innerWidth )
    //console.log(window.innerHeight )

    //console.log(window.outerWidth )
    //console.log(window.outerHeight )

    //console.log(window.pageXOffset)
    //console.log(window.pageYOffset)
  }

  return (
    <div className="App">
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
              placeholder="from app"
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

      <Select
        options={[
          { value: "title", name: "title" },
          { value: "date", name: "date" },
        ]}
        defaultValue={"Sort by"}
        value={selectedSort}
        onChange={sortPost}
      />

      {/* {state.loading === true ? (
        <Loader />
      ) : (
        <PostList
          post={state.posts}
          postTogle={postTogle}
          remove={removePost}
        />
      )}
      {loading2 && <Loader2 />} */}

      <Posts />

      {pageArray.map((p) => (
        <button
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "current_page" : "just_page"}
        >
          {p}
        </button>
      ))}
    </div>
  )
}

export default App
