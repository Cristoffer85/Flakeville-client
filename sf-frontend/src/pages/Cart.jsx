import React, {useContext} from 'react';
import CartContext from "../components/CartContext.jsx";
import './css/Cart.css';
import Cookies from 'js-cookie';

async function sendOrder(cart) {
    const token = Cookies.get('token'); // Get the token from cookies
    const username = Cookies.get('username'); // Get the username from cookies

    const order = {
        id: "1", // You might want to generate this dynamically
        products: cart.map(item => ({
            product: {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price
            },
            quantity: item.quantity // Assuming each item in the cart has a quantity property
        }))
    };

    const response = await fetch(`http://localhost:8080/user/addOrder/${username}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
    });

    if (response.ok) {
        console.log('Order sent successfully');
    } else {
        console.log('Failed to send order:', await response.text());
    }
}

function Cart() {
    const { cart } = useContext(CartContext);

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            <div className="cart-header">
                <h4>Name</h4>
                <h4>Description</h4>
                <h4>Price</h4>
            </div>
            {cart.map((item, index) => (
                <div key={index} className="cart-item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                </div>
            ))}
            <button onClick={() => sendOrder(cart)}>Send Order</button>
        </div>
    );
}

export default Cart;