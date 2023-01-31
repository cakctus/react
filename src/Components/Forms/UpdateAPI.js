import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function UpdateForm() {

    const [newPost, setNewPost] = React.useState({title: '', price: '', cagatory: ''})

    const obj = {
        title: newPost.title,
        price: newPost.price,
        cagatory: newPost.category,
    }

    const params = useParams()

    function updatePost() {
        axios.put(`http://127.0.0.1:8000/api/${params.id}/`, {
              title: newPost.title,
              price: newPost.price
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
 

    return (
        <div className='Form'>
        <form onSubmit={() => updatePost()}>
            <input type='text' placeholder='title' value={newPost.title} onChange={value => setNewPost({title: value.target.value})} /> <br/>
            <input type='number' placeholder='price' value={newPost.price} onChange={value => setNewPost({price: value.target.value})} />  <br/>
            <button onClick={updatePost()} >update</button>
        </form>

        </div>
      
    );
}

export default UpdateForm;