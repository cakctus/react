import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {NavLink} from 'react-router-dom'
import {useParams} from 'react-router-dom'


const Order = () => {
    
    const [order, setOrder] = useState([])
    const [ordered, setOrdered] = useState({})

    

    React.useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/orders/`)
        .then(response => {
            setOrder([response.data.results])
        }, error => {
            //console.log(error)
        });
    }, [])

    React.useEffect(() => {
        for (let x in order[0]) {
            //console.log(x)
           if (order[0][x].ordered === false) {
               //console.log(order[0][x], 'useeffect')
               setOrdered(order[0][x])               
           }
        }
    }, [])
    return (
        <div className='App'>
            <OrderList order={order} />
        </div>
    )
}

function OrderList(props) {
    let orderStatus;
    //console.log(props.order[0], 'asdas')
     for (let x in props.order[0]) {
         //console.log(props.order[0][x].ordered, 'ss')
         //console.log(x, 'x')
        if (props.order[0][x].ordered === false) {
            //console.log(props.order[x], 's')
            //console.log(props.order[0][x])
            orderStatus = props.order[0][x]
            //setOrdered(props.order[0][x])
            //return props.order
            { <OrderItem order={props.order[0][x]} /> }
            //return props.order[0][x]
             
        }

     }
     //console.log(orderStatus)
    return (
      <div>
          {props.order.map((order, index) => (
              <OrderItem order={orderStatus}  key={index +1}/> 
        ))}
      </div>
    );
  }


function OrderItem({order}) {
    let id = []
    let item = [];
    let price = [];
    let quantaty = [];
    let totalPrice = [];
 
    for (let i = 0; i < order.items.length; i++) {
        id.push(order.items[i].item.id)
        item.push(order.items[i].item.title)
        price.push(order.items[i].item.price)
        quantaty.push(order.items[i].quantaty)
        totalPrice.push(order.items[i].get_total_price)
    }

    function plusItem() {
        axios
        .get('http://127.0.0.1:8000/plus/39')
        .then((response) => { 
            //console.log('hi')
            alert("Item added");
        });
      }

      function minusItem() {
        axios
        .get('http://127.0.0.1:8000/minus/39')
        .then(() => {
            //console.log('hi')
            alert("Item removed");
        });
      }

    return (
        <div>  
            <table className="table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Items</th>
                        <th>Price</th>
                        <th >Quantaty </th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{order.user}</td>
                        <td>{ item.map((item) => <p>{item}</p> )} </td>
                        <td>{ price.map((price) => <p>{price}</p> )} </td>
                        <td> {quantaty.map((quantaty) => <p>
                        <button type="submit" onClick={minusItem}> - </button> {quantaty} <button type="submit" onClick={plusItem}> + </button>
                        </p>  
                        )}  
                        </td>
                        <td>{totalPrice.map((totalPrice) => <p>{totalPrice}</p> )} </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Sum</td>
                        <td> </td>
                        <td> </td>
                        <td> ${order.get_total}</td>
                        <td><NavLink  className='navbar__links' to='/checkout' > Checkout </NavLink></td>
                    </tr>
                </tfoot>
            </table>
           
        </div>
    )

}



const  OrderId = ({item, price, quantaty, id, totalPrice}) => {
    const [sQuantaty, setQuantaty] = useState(quantaty)
    
    function plusItem(event) {
        event.preventDefault()
        axios
        .get('http://127.0.0.1:8000/plus/39')
        .then((response) => { 
            //console.log('hi')
            alert("Item added");
        });
      }

      function minusItem(event) {
        event.preventDefault()
        axios
        .get('http://127.0.0.1:8000/minus/16')
        .then(() => {
            //console.log('hi')
            alert("Item removed");
        });
      }

      let itemID = '';

      for (let i in id) {
        itemID += id[i]
      }

      //console.log(item)

    //console.log(sQuantaty)

    function changeQuantaty() {
        setQuantaty((prev) => {
            return prev +1
        })
    }

    function changeQuantatyMinus() {
        setQuantaty((prev) => {
            return prev -1
        })
    }

     
    return (
        <div>
            {item}
            {price} 
            {sQuantaty} <form onSubmit={plusItem}>
                            <button type="submit" onClick={changeQuantaty}> </button>
                        </form> 
                        <form onSubmit={minusItem}>
                            <button type="submit" onClick={changeQuantatyMinus}></button>
                        </form> 
                        
            {totalPrice}
        </div>
    ) 
}

export default Order;


