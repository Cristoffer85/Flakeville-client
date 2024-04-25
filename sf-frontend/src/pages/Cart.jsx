import React, {useContext, useState} from 'react';
import CartContext from "../components/CartContext.jsx";
import './css/Cart.css';
import Cookies from 'js-cookie';

async function sendOrder(cart, setCart, setSuccessMessage) {
    const token = Cookies.get('token');
    const username = Cookies.get('username');

    const order = {
        id: "Previous order",
        products: cart.map(item => ({
            product: {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price
            },
            quantity: item.quantity
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
        setSuccessMessage("Order Successfully sent!");
        setCart([]); // Clear the cart
    } else {
        console.log('Failed to send order:', await response.text());
    }
}

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const [successMessage, setSuccessMessage] = useState(null);

    const updateQuantity = (product, quantity) => {
        const updatedCart = cart.map(item =>
            item.id === product.id ? { ...item, quantity: Number(quantity) } : item
        );
        setCart(updatedCart);
    };

    const deleteFromCart = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            <div className="cart-header">
                <h4>Name</h4>
                <h4>Description</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
            </div>
            {cart.map((item, index) => (
                <div key={index} className="cart-item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                    <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item, e.target.value)} min="1" />
                    <button onClick={() => deleteFromCart(item)}>Delete</button>
                </div>
            ))}
            <button onClick={() => sendOrder(cart, setCart, setSuccessMessage)}>Send Order</button>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default Cart;