import React, { useEffect, useState, useContext } from 'react';
import './css/Store.css';
import {Link} from "react-router-dom";
import CartContext from "../components/CartContext.jsx";

function Store() {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext); // Access the cart state and setCart function using the context

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await fetch('http://localhost:8080/products/getAllProducts');
        const data = await response.json();
        setProducts(data);
    };

    const addToCart = (product) => { // New function for adding items to the cart
        setCart([...cart, product]);
    };

    return (
        <div className="product-container">
            {products.map((product, index) => (
                <div key={index} className="product-item">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                    <Link to="/cart">View Cart</Link>
                </div>
            ))}
        </div>
    );
}

export default Store;