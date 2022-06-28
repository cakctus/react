import React from 'react';


function Value() {
    const [value, setValue] = React.useState('Create')


    return (
        <div> 
            {value}
            <input type='text' value={value} onChange={value => setValue(value.target.value)}/>
        </div>
    );
}

export default Value;
