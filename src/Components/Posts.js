import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import { createStore } from "redux";
import { Provider } from "react-redux";

import PostList from './PostList';
import Loader from './Loader';
import Loader2 from './Loader'
import Modal from './Modal';
import Form from './Form';
import FormAPI from './FormAPI';
import ModalMessage from './ModalMessage'


function Posts() {
    const [post, setPost] = React.useState([])

    const reducer = (state, action) => {
        console.log(state.post)
        if (action.type === 'ADD_ITEM') {
          const newItem = [...state.post, action.payload]
          return {
            ...state, 
            post: newItem,
            isModalOpen: true,
            modalContent: 'added',
          }
        }

        if (action.type === 'CLOSE_MODAL') {
            return {
                ...state,
                isModalOpen: false
            }
        }
      }
      
      const defaultState = {
        post: post,
        isModalOpen: false,
        modalContent: '',
      }

    const [state, dispatch] = useReducer(reducer, defaultState)

    

    const [title, setTitle] = React.useState('')
    const [newPost, setNewPost] = React.useState({title: ''})
    const [modal, setModal] = React.useState(false)

    const [loading, setLoading] = React.useState(true)
    const [loading2, setLoading2] = React.useState(false)
    
    const [currentPage, setCurrentPage] = React.useState(1)
    const [fetching, setFetching] = React.useState(true)
    const [totalItem, setTotalItem] = React.useState(0)

    useEffect(() => {
        if (fetching) {
          //axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
          axios.get(`http://127.0.0.1:8000/api/items/?page=${currentPage}`)
          .then(response => {
            if (response.status === 200) {
              setLoading(false)
              setLoading2(true)
              setPost([...post, ...response.data.results])
              setTotalItem(response.data.count)
              setCurrentPage(prev =>  prev + 1)
            }
          }, error => {
            if (error.request.status === 404) {
              setLoading2(false)
              setFetching(false)
            }
          })
          .finally( () => setFetching(false))
        }
      }, [fetching])
    
      useEffect(() => {
        document.addEventListener('scroll', scrollHandler )
        return function () {
          document.removeEventListener('scroll', scrollHandler)
        };
      }, []) 
    
      const scrollHandler = (e) => {
          if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
          setFetching(true)
      }
    }

    function openModal() {
        setModal(true)
    }
    
    function closeModal() {
      setModal(false)
    }

    const objCreate = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewPost({...newPost, [name]:value})
      }
    
      const newPostFunction = (e) => {
        e.preventDefault()
        
        if (newPost.title) {
          const nPost = {...newPost, id: new Date().getTime().toString()}
          dispatch({type: 'ADD_ITEM', payload: nPost})
          //setPost([...post, {...newPost, nPost }])
        }
        if (title) {
          const n = {id: Date.now(), title: title, completed: false}
          dispatch({type: 'ADD_ITEM', payload: n})
          //setPost([...post, n])
        }
    
        setTitle('')
        setNewPost({title: ''})
      }

      const createPost = (newPost) => {
        setPost([...post, newPost])
      }

      const closeModalDispatch = () => {
        dispatch({type: 'CLOSE_MODAL'})
      }


    return(
        <div>
             <button onClick={openModal} style={{marginRight:10, borderRadius:10, textAlign:'center'}}>Create post</button>
            {modal && 
                <Modal setVisible={setModal}>
                {state.isModalOpen && <ModalMessage  closeModal={closeModalDispatch} modalContent={state.modalContent}  />}
                
                <form>
                <input type='text' value={title} placeholder='title' onChange={value => setTitle(value.target.value)} ></input> <br/>
                <input type='text' value={newPost.title} id='title' name='title' placeholder='from app' onChange={objCreate} ></input> <br/>   
                </form>
                <button onClick={newPostFunction}>Create</button>
                <hr/>
                <Form create={createPost}/>
                <hr/>
                <FormAPI requestType='post' btnText='Create'/> <br/>
                <button onClick={closeModal}>Close</button>
                </Modal>
            }
            {loading === true ? <Loader/> : <PostList post={post} />}
            {loading2 && <Loader2/>}
        </div>
    )

}

export default Posts;