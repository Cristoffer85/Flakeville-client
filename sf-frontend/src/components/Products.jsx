import React, { useState } from 'react';
import {Link} from "react-router-dom";

/*
Component to handle each product in Store.jsx, (as a child component == nested component) in order to handle quantity
per product. Otherwise the hookrules would be violated, and all products would share the same quantity.
*/

function Products({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
            <button onClick={() => addToCart(product, quantity)}>Add to Cart</button>
            <Link to="/cart">View Cart</Link>
        </div>
    );
}

export default Products;