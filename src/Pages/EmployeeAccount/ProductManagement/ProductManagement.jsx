import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, getOneProduct, updateProduct, deleteProduct } from '../../../Api/ProductApi/ProductApi.jsx';

import '../EmployeeAccount.css';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [createProductFormFields, setCreateProductFormFields] = useState({ name: '', description: '', price: '', category: '' });
    const [updateProductFormFields, setUpdateProductFormFields] = useState({ Id: '', name: '', description: '', price: '', category: '' });
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const products = await getAllProducts();
        setProducts(products);
    };

    const handleCreateProduct = async (event) => {
        event.preventDefault();
        await createProduct(createProductFormFields);
        setCreateProductFormFields({ name: '', description: '', price: '', category: '' });
        await fetchProducts();
    };

    const handleGetOneProduct = async (id) => {
        const product = await getOneProduct(id);
        setSelectedProduct(product);
        await fetchProducts();
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        if (!selectedProduct) {
            console.error('No product selected for update');
            return;
        }

        const updatedProduct = {
            Id: updateProductFormFields.Id || selectedProduct.Id,
            name: updateProductFormFields.name || selectedProduct.name,
            description: updateProductFormFields.description || selectedProduct.description,
            price: updateProductFormFields.price || selectedProduct.price,
            category: updateProductFormFields.category || selectedProduct.category
        };

        await updateProduct(selectedProduct.Id, updatedProduct);
        setUpdateProductFormFields({ Id: '', name: '', description: '', price: '', category: '' });
        await fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        await fetchProducts();
    };

    return (
        <div className="productManagementBox">
            <h2>Product Management</h2>
            <form onSubmit={handleCreateProduct}>
                <input
                    type="text"
                    value={createProductFormFields.name}
                    onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, name: e.target.value })}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={createProductFormFields.description}
                    onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, description: e.target.value })}
                    placeholder="Product Description"
                />
                <input
                    type="text"
                    value={createProductFormFields.price}
                    onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, price: e.target.value })}
                    placeholder="Product Price"
                />
                <input
                    type="text"
                    value={createProductFormFields.category}
                    onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, category: e.target.value })}
                    placeholder="Product Category"
                />
                <button type="submit">Create Product</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product.Id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleGetOneProduct(product.Id)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.Id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedProduct && (
                <form onSubmit={handleUpdateProduct}>
                    <input
                        type="text"
                        value={updateProductFormFields.name}
                        onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, name: e.target.value })}
                        placeholder="Product Name"
                    />
                    <input
                        type="text"
                        value={updateProductFormFields.description}
                        onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, description: e.target.value })}
                        placeholder="Product Description"
                    />
                    <input
                        type="text"
                        value={updateProductFormFields.price}
                        onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, price: e.target.value })}
                        placeholder="Product Price"
                    />
                    <input
                        type="text"
                        value={updateProductFormFields.category}
                        onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, category: e.target.value })}
                        placeholder="Product Category"
                    />
                    <button type="submit">Update Product</button>
                </form>
            )}
        </div>
    );
}

export default ProductManagement;