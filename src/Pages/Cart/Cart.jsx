import React, { useContext, useState } from 'react';
import CartContext from '../../Contexts/CartContext/CartContext.jsx';
import { sendOrder } from '../../Api/CartApi/CartApi';

import './Cart.css';

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const [successMessage, setSuccessMessage] = useState(null);
    const isLoggedIn = Cookies.get('isLoggedIn');
    const userRole = Cookies.get('role');

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

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

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
                    <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item, e.target.value)}
                           min="1"/>
                    <button onClick={() => deleteFromCart(item)}>Delete</button>
                </div>
            ))}
            <div className="cart-total total-box">
                <h4></h4>
                <h4></h4>
                <h4>Total: {totalPrice} :-</h4>
                <h4>Total: {totalCount}</h4>
            </div>
            <div className="order-container">
                <h3 className="total-price-text">Total price: {totalPrice} :-</h3>
                {isLoggedIn && userRole === 'USER' && cart.length > 0 ? (
                    <button className="send-order-button"
                            onClick={() => sendOrder(cart, setCart, setSuccessMessage)}>Send Order</button>
                ) : (
                    <p className="signin-text">{cart.length > 0 ? "Sign in or sign up as a User to send your order!" : "Your cart is empty."}</p>
                )}
            </div>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default Cart;