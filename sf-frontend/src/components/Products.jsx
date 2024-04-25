import React, { useState } from 'react';

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