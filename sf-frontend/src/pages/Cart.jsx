import React, {useContext} from 'react';
import CartContext from "../components/CartContext.jsx";
import './css/Cart.css';

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
        </div>
    );
}

export default Cart;