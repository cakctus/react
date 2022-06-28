import React, { useState } from 'react';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import '@stripe/stripe-js';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange
// dynamic object keys

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_doDtTbwo4WXrCIyg96hxC1CY00Fz4WDfRv');
  }
  return stripePromise;
};

const Checkout = () => {
  const [checkout, setCheckout] = useState({ street: '', appartment: '', zip: '', payment: ['Stripe', 'Paypal']})
  const [billing, setBilling] = useState(false)
  const [save, setSave] = useState(false)
  const [payment, setPayment] = useState(['Stripe', 'Paypal'])
  const [pay, setPay] = useState('')
  const [check, setCheck] = useState([]);

  const item = {
    price: 'price_1LFepNApbL7rbNPPrwmIJRhp',
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    console.log("redirectToCheckout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name, value)
    setCheckout({...checkout, [name]:value})
  }

  const obj = {
    street: checkout.street,
    appartment: checkout.appartment,
    zip: checkout.zip,
    billing: billing.billing,
    savee: save.save,
    payment: pay,
  }

  console.log(obj)
  
  const changeBilling =  () => {
    setBilling(prevState => ({
        billing: !prevState.billing
      }))
  }

  const changeSaveInfo =  () => {
    setSave(prevState => ({
        save: !prevState.save
      }))
  }
  const paymentClick =  (id) => {
    setPay(id)
  }


  function postCheckout(e) {
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/api/checkout/', obj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
            });
  }


  return (
    <>
      <article className='App'>
        <form className='form' onSubmit={postCheckout}>
          <div className='form-control'>
            <label htmlFor='street'>street : </label>
            <input
              type='text'
              id='street'
              name='street'
              value={checkout.street}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='appartment'>appartment : </label>
            <input
              type='text'
              id='appartment'
              name='appartment'
              value={checkout.appartment}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='zip'>zip : </label>
            <input
              type='number'
              id='zip'
              name='zip'
              value={checkout.zip}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='zip'>billing : </label>
            <input
              type='checkbox'
              id='billing'
              name='billing'
              value={billing}
              onChange={changeBilling}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='zip'>save info : </label>
            <input
              type='checkbox'
              id='savee'
              name='savee'
              value={save}
              onChange={changeSaveInfo}
            />
          </div>
          <div className='form-control'>
          <label htmlFor='zip'>payment option: </label>
            <input
              type='radio'
              id='billing'
              name='billing'
              value={payment[0]}
              onClick={() => paymentClick(payment[0])}
            />
             <input
              type='radio'
              id='billing'
              name='billing'
              value={payment[1]}
              onClick={() => paymentClick(payment[1])}
            />
         </div>
          
          
          <button type='submit' onClick={redirectToCheckout}>send</button>
        </form>

        {obj.street} <br />
        {obj.appartment} <br />
        {obj.zip} <br />
        {billing ? 'true' : 'false'} <br />
        {save ? 'true': 'false'} <br />
        {pay} <br />

      </article>
    </>
  );
};

export default Checkout;
