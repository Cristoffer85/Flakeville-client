import React, { useState } from 'react';
import Cookies from "js-cookie";

export const createProduct = async (product) => {
    const token = Cookies.get('token');

    const response = await fetch('http://localhost:8080/products/createProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        console.log('Product created');
        // You can add additional logic here, such as refreshing the product list
    } else {
        console.log('Product creation failed:', await response.text());
    }
};

export const updateProduct = async (id, product) => {
    const token = Cookies.get('token');

    const response = await fetch(`http://localhost:8080/products/updateProduct/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        console.log('Product updated');
        // You can add additional logic here, such as refreshing the product list
    } else {
        console.log('Product update failed:', await response.text());
    }
};

export const deleteProduct = async (productId) => {
    const token = Cookies.get('token'); // Get the token from cookies

    const response = await fetch(`http://localhost:8080/products/deleteProduct/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
    });

    if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
    }

    console.log('Product deleted successfully');
};

function Products({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(null);

    const handleAddToCart = (product, quantity) => {
        addToCart(product, quantity);
        setMessage("Product added to cart!");

        // Clear the message after 3 seconds
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
        <div className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
            <button onClick={() => handleAddToCart(product, quantity)}>Add to Cart</button>
            {message && <span>{message}</span>}
        </div>
    );
}

export default Products;