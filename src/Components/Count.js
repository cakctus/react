import React from 'react';


function Count() {
  const [count, setCount] = React.useState(0)
  
  function incriment() {
    return setCount(count + 1)
  }
  return (
    <div> 
        {count}
        <button onClick={incriment}>Increase</button> <br/>
    </div>
  );
}

export default Count;
