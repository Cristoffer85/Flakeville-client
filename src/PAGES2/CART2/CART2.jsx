import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../CONTEXTS2/CARTCONTEXT2/CARTCONTEXT2.jsx';
import { sendOrder } from '../../API2/CARTAPI2/CARTAPI2.jsx';
import AuthContext from '../../CONTEXTS2/AUTHCONTEXT2/AUTHCONTEXT2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const { authState } = useContext(AuthContext);
    const { isLoggedIn, role, username } = authState;
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

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="row d-none d-md-flex justify-content-between mb-3">
                                <div className="col-3 text-center">
                                    <h4>Name</h4>
                                </div>
                                <div className="col-3 text-center">
                                    <h4>Description</h4>
                                </div>
                                <div className="col-2 text-center">
                                    <h4>Price</h4>
                                </div>
                                <div className="col-2 text-center">
                                    <h4>Quantity</h4>
                                </div>
                                <div className="col-2 text-center">
                                    <h4></h4>
                                </div>
                            </div>
                            {cart.map((item, index) => (
                                <div key={index} className="row align-items-center mb-3 border-bottom pb-3">
                                    <div className="col-12 col-md-3 text-center">
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="col-12 col-md-3 text-center">
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="col-12 col-md-2 text-center">
                                        <p>${item.price}</p>
                                    </div>
                                    <div className="col-12 col-md-2 text-center">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item, e.target.value)}
                                            min="1"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12 col-md-2 text-center">
                                        <button onClick={() => deleteFromCart(item)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            ))}
                            <div className="row justify-content-end mt-3">
                                <div className="col-12 col-md-3 text-center">
                                    <h4>Total: ${totalPrice}</h4>
                                </div>
                                <div className="col-12 col-md-3 text-center">
                                    <h4>Total Items: {totalCount}</h4>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4">
                                <div className="col-12 col-md-6 text-center">
                                    <h3 className="mb-3">Total price: ${totalPrice}</h3>
                                    {isLoggedIn && role.includes('USER') && cart.length > 0 ? (
                                        <button
                                            className="btn btn-success btn-lg"
                                            onClick={() => sendOrder(cart, setCart, setSuccessMessage, username)}
                                        >
                                            Send Order
                                        </button>
                                    ) : (
                                        <p className="text-danger">
                                            {cart.length > 0 ? (
                                                <>
                                                    <Link to="/signin" className="btn btn-link p-0" style={{ verticalAlign: 'baseline' }}>Sign in</Link> to send your order!
                                                </>
                                            ) : (
                                                "Your cart is empty."
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;