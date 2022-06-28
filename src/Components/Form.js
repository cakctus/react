import React from 'react';


function Form({create}) {

    const [newPost, setNewPost] = React.useState({title: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        create(newPost)  
        setNewPost({id: new Date().getTime().toString(), newtitle: ''})
      }

    return (
        <div className='Form'>
        <form onSubmit={addNewPost}>
            <input type='text' value={newPost.title} onChange={value => setNewPost({title: value.target.value})} ></input>   
        </form>

        <button onClick={addNewPost}>Create</button>
        </div>
      
    );
}

export default Form;
