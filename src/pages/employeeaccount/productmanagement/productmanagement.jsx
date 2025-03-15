import React, { useState, useEffect } from 'react';
import { getAllProducts, getOneProduct, deleteProduct } from '../../../api/productapi/productapi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductManagement({ onEditProduct }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const products = await getAllProducts();
        setProducts(products);
    };

    const handleGetOneProduct = async (id) => {
        const product = await getOneProduct(id);
        setSelectedProduct(product);
        onEditProduct(product);
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        await fetchProducts();
    };

    return (
        <div>
            <ul className="list-group mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {products.map((product) => (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {product.name} - {product.price} SEK
                        <div>
                            <button onClick={() => handleGetOneProduct(product.id)} className="btn btn-secondary btn-sm me-2">Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductManagement;