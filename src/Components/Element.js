import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

function Element() {
  return (
    <div className='App'>
         <Elements>
            <CheckoutForm />
        </Elements>
    </div>
  )
}

export default Element