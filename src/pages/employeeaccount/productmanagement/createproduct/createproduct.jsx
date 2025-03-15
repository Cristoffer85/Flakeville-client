import React, { useState } from 'react';
import { createProduct } from '../../../../api/productapi/productapi.jsx';
import { categories } from '../../../../components/categories/categories.jsx';

function CreateProduct({ onClose }) {
    const [createProductFormFields, setCreateProductFormFields] = useState({ name: '', description: '', price: '', category: '' });

    const handleCreateProduct = async (event) => {
        event.preventDefault();
        await createProduct(createProductFormFields);
        setCreateProductFormFields({ name: '', description: '', price: '', category: '' });
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
                <h5 className="card-title">Create Product</h5>
                <form onSubmit={handleCreateProduct}>
                    <div className="mb-3">
                        <label className="form-label">Product Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={createProductFormFields.name}
                            onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, name: e.target.value })}
                            placeholder="Product Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={createProductFormFields.description}
                            onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, description: e.target.value })}
                            placeholder="Product Description"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={createProductFormFields.price}
                            onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, price: e.target.value })}
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Category:</label>
                        <select
                            className="form-control"
                            value={createProductFormFields.category}
                            onChange={(e) => setCreateProductFormFields({ ...createProductFormFields, category: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Product</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;