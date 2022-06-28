import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function FormAPI(props) {

    const [newPost, setNewPost] = React.useState({title: '', price: 0, cagatory: ''})

    const obj = {
        title: newPost.title,
        price: newPost.price,
        cagatory: newPost.category,
    }

    const params = useParams()

    function handleFormSubmit(requestType) {
        if (requestType === 'post') {
            axios.post('http://127.0.0.1:8000/api/items/', obj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        } else if (requestType === 'put') {
            axios.put(`http://127.0.0.1:8000/api/items/${params.id}/`, {
                  title: newPost.title,
                  price: newPost.price
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }    
    }
 

    return (
        <div className='Form'>
        <form onSubmit={() => handleFormSubmit(props.requestType)}>
            <input type='text' placeholder='title' value={newPost.title} onChange={value => setNewPost({title: value.target.value})} /> <br/>
            <input type='number' placeholder='price' value={newPost.price} onChange={value => setNewPost({price: value.target.value})} />  <br/>
            <button >{props.btnText}</button>
        </form>

        </div>
      
    );
}

export default FormAPI;