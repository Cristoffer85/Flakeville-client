import React, {useContext} from 'react';
import CartContext from "./CartContext.jsx";

function Cart() {
    const { cart } = useContext(CartContext);

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cart.map((item, index) => (
                <div key={index}>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Cart;