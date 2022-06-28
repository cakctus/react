import React, { useEffect } from 'react'
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import BaseRouter from './routes';
import  Context  from './Context/context';
import {loadStripe} from '@stripe/stripe-js';
import '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App(props) {
  const [isAuth, setIsAuth] = React.useState(() => {
    return false
  })

  const [darkMode, setDarkMode] = React.useState(props.darkMode)

  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_1sohgIdsuN2xZmSSpn7Ja0XX00JMccyzyB',
  };

  const styles = {
    backgroundColor: darkMode ? '#202124' : 'white',
    color: darkMode ? 'white' : 'black',
    borderRadius: darkMode ? '0' : '5px',
    a: {
      color: darkMode ? 'white' : 'black',
    }
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (sessionStorage.getItem('auth')) {
      setIsAuth(true)
    }
  }, [])

  return (
    <div className='main' style={styles}> 
      <Context.Provider value={{isAuth, setIsAuth, darkMode, setDarkMode, toggleDarkMode}} >
        <BrowserRouter>
          <BaseRouter darkMode={darkMode}/>
        </BrowserRouter>
    </Context.Provider>
    </div>
  );
}

export default App;
