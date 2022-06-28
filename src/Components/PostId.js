import React from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";
import UpdateForm from "./UpdateAPI";
import FormAPI from "./FormAPI";


function PostId() {

  const [post, setPost] = React.useState({
    id: '',
    title: '',
    price: '',
    discount_price: '',
    pic: '',
  })

  const [comment, setComment] = React.useState([])

  let comments = '';
  for (let x of comment) {
      comments += x
  }

  

  const [notFount, setNotFound] = React.useState(false)

  let params = useParams()

  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/items/${params.id}/`)
    .then(response => {
      if (response.status === 200) {
        setPost({
          id: response.data.id, 
          title: response.data.title, 
          price: response.data.price, 
          discount_price: response.data.discount_price, 
          pic: response.data.pic
        })
        setComment([response.data.comment])
      }
    }, error => {
      if (error.request.status === 404) {
        setNotFound(true)
      }
    });
  }, [])
  

  function addToCard() {
    axios
      .get(`http://127.0.0.1:8000/add/${params.id}`)
      .then(() => {
        alert("Item added to card");
      });
  }

  function removeToCard() {
    axios
      .get(`http://127.0.0.1:8000/remove/${params.id}`)
      .then(() => {
        alert("Item  removed to card!");
      });
  }
  
  function deletePost() {
    axios
      .delete(`http://127.0.0.1:8000/api/items/${params.id}`)
      .then(() => {
        alert("Post deleted!");
      });
  }
  

     
    return (
    <div className="App">
    {post.title} <br/>
    <del>{post.price} $</del>  {post.discount_price} $ <br/>
    <img src={post.pic} alt="" width={350} height={'auto'}/> 

    <form onSubmit={() => addToCard()}>
      <button > add to card </button>
    </form> 

    <form onSubmit={() => removeToCard()}>
    <button > remove from card  </button>
    </form> 
     
     <br /> <hr />

    {notFount === true ? '404' 
    :
    <form onSubmit={() => deletePost()}>
      <button > delete  </button>
    </form> 
    }

    <br/> <br/>
    <FormAPI requestType='put' btnText='Update' />

    <p>Comments:</p>
    { comments} 

    </div>
    
    )
}

export default PostId;


