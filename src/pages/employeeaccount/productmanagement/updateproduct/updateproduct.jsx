import React, { useState, useEffect } from 'react';
import { updateProduct } from '../../../../api/productapi/productapi.jsx';
import { categories } from '../../../../components/categories/categories.jsx';

function UpdateProduct({ product, onClose }) {
    const [updateProductFormFields, setUpdateProductFormFields] = useState({ id: '', name: '', description: '', price: '', category: '' });

    useEffect(() => {
        setUpdateProductFormFields(product);
    }, [product]);

    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        const updatedProduct = {
            id: updateProductFormFields.id,
            name: updateProductFormFields.name,
            description: updateProductFormFields.description,
            price: updateProductFormFields.price,
            category: updateProductFormFields.category
        };

        await updateProduct(product.id, updatedProduct);
        onClose();
    };

    return (
        <div className="card position-relative">
            <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
                onClick={onClose}
            ></button>
            <div className="card-body">
                <h5 className="card-title">Update Product</h5>
                <form onSubmit={handleUpdateProduct}>
                    <div className="mb-3">
                        {/*<label className="form-label">Product Name:</label>*/}
                        <input
                            type="text"
                            className="form-control"
                            value={updateProductFormFields.name}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, name: e.target.value })}
                            placeholder="Product Name"
                        />
                    </div>
                    <div className="mb-3">
                        {/*<label className="form-label">Product Description:</label>*/}
                        <input
                            type="text"
                            className="form-control"
                            value={updateProductFormFields.description}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, description: e.target.value })}
                            placeholder="Product Description"
                        />
                    </div>
                    <div className="mb-3">
                        {/*<label className="form-label">Product Price:</label>*/}
                        <input
                            type="text"
                            className="form-control"
                            value={updateProductFormFields.price}
                            onChange={(e) => setUpdateProductFormFields({ ...updateProductFormFields, price: e.target.value })}
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="mb-3">
                        {/*<label className="form-label">Product Category:</label>*/}
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
            </div>
        </div>
    );
}

export default UpdateProduct;