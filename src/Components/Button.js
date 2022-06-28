import React from 'react';



const style =  {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    width: 200,
    height: 40,
}

function Button(props) {
    return (
        <div> 
           <button style={style}>{props.children}</button>
        </div>
    );
}

export default Button;
