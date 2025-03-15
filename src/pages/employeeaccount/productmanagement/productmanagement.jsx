import React, { useState, useEffect } from 'react';
import { getAllProducts, getOneProduct, updateProduct, deleteProduct } from '../../../api/productapi/productapi.jsx';
import { categories } from '../../../components/categories/categories.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [updateProductFormFields, setUpdateProductFormFields] = useState({ id: '', name: '', description: '', price: '', category: '' });
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
        setUpdateProductFormFields(product);
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        if (!selectedProduct) {
            console.error('No product selected for update');
            return;
        }

        const updatedProduct = {
            id: updateProductFormFields.id || selectedProduct.id,
            name: updateProductFormFields.name || selectedProduct.name,
            description: updateProductFormFields.description || selectedProduct.description,
            price: updateProductFormFields.price || selectedProduct.price,
            category: updateProductFormFields.category || selectedProduct.category
        };

        await updateProduct(selectedProduct.id, updatedProduct);
        setUpdateProductFormFields({ id: '', name: '', description: '', price: '', category: '' });
        await fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        await fetchProducts();
    };

    return (
        <div>
            <ul className="list-group mb-4">
                {products.map((product) => (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {product.name} - ${product.price}
                        <div>
                            <button onClick={() => handleGetOneProduct(product.id)} className="btn btn-secondary btn-sm me-2">Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedProduct && (
                <form onSubmit={handleUpdateProduct}>
                    <div className="mb-3">
                        <label className="form-label">Product Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={updateProductFormFields.name}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, name: e.target.value })}
                            placeholder="Product Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={updateProductFormFields.description}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, description: e.target.value })}
                            placeholder="Product Description"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={updateProductFormFields.price}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, price: e.target.value })}
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Category:</label>
                        <select
                            className="form-control"
                            value={updateProductFormFields.category}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, category: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            )}
        </div>
    );
}

export default ProductManagement;