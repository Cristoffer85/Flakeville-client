import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import { getEmployeeData, updateEmployeeData, fetchLifts, startLift, stopLift } from '../../Api/EmployeeApi/EmployeeApi';
import { getOneProduct, getAllProducts, createProduct, updateProduct, deleteProduct } from '../../Components/Products/Products.jsx';
import { categories } from '../../Components/Categories/Categories.jsx';

import LiftsContext from '../../Contexts/LiftsContext/LiftsContext.jsx';

import './EmployeeAccount.css';

function Employee() {
    const username = Cookies.get('username');
    const [employeeDetails, setEmployeeDetails] = useState({ name: '', position: '' });
    const [formFields, setFormFields] = useState({ name: '', position: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [createProductFormFields, setCreateProductFormFields] = useState({ name: '', description: '', price: '', category: '' });
    const [updateProductFormFields, setUpdateProductFormFields] = useState({ Id: '', name: '', description: '', price: '', category: '' });
    const [deleteProductId, setDeleteProductId] = useState('');
    const [productId, setProductId] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentSection, setCurrentSection] = useState('employeeDetails');
    const { lifts, setLifts } = useContext(LiftsContext);
    const [liftStatus, setLiftStatus] = useState({});
    const navigate = useNavigate();

    // #################### EMPLOYEE DATA ####################

    useEffect(() => {
        getEmployeeData(username)
            .then(data => setEmployeeDetails(data))
            .catch(error => console.error('Error:', error));
    }, [username]);

    const handleUpdateEmployeeData = async (event) => {
        event.preventDefault();

        try {
            await updateEmployeeData(username, formFields);
            setSuccessMessage('Information updated');
            setFormFields({ name: '', position: '' }); // Clear the form
            const updatedData = await getEmployeeData(username); // Fetch the updated employee details
            setEmployeeDetails(updatedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // #################### Product DATA (imported from Products.jsx for easier endpoint logic) ####################

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
        setCreateProductFormFields({ name: '', description: '', price: '', category: '' }); // Clear the form
        await fetchProducts();
    };

    const handleGetOneProduct = async (id) => {
        const product = await getOneProduct(id);
        setSelectedProduct(product);
        await fetchProducts();
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        // Check if selectedProduct is not null
        if (!selectedProduct) {
            console.error('No product selected for update');
            return;
        }

        // If a field in updateProductFormFields is empty, use the corresponding value from selectedProduct
        const updatedProduct = {
            Id: updateProductFormFields.Id || selectedProduct.Id,
            name: updateProductFormFields.name || selectedProduct.name,
            description: updateProductFormFields.description || selectedProduct.description,
            price: updateProductFormFields.price || selectedProduct.price,
            category: updateProductFormFields.category || selectedProduct.category
        };

        await updateProduct(productId, updatedProduct);
        setUpdateProductFormFields({ Id: '', name: '', description: '', price: '', category: '' });
        await fetchProducts();
    };

    const handleDeleteProduct = async (event) => {
        event.preventDefault();
        await deleteProduct(deleteProductId);
        setDeleteProductId('');
        await fetchProducts();
    };

    // #################### SKI LIFTS ####################

    useEffect(() => {
        fetchLifts()
            .then(data => setLifts(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleStartLift = async (id) => {
        try {
            await startLift(id);
            fetchLifts()
                .then(data => setLifts(data))
                .catch(error => console.error('Error:', error));
            setLiftStatus(prevStatus => ({ ...prevStatus, [id]: 'Lift started!' }));
        } catch (error) {
            console.error('Error starting lift:', error);
        }
    };

    const handleStopLift = async (id) => {
        try {
            await stopLift(id);
            fetchLifts()
                .then(data => setLifts(data))
                .catch(error => console.error('Error:', error));
            setLiftStatus(prevStatus => ({ ...prevStatus, [id]: 'Lift stopped!' }));
        } catch (error) {
            console.error('Error stopping lift:', error);
        }
    };

    return (
        <div className="accountContainer">
            <div className="sidebar">
                <p className="welcome-message">WELCOME, {username}!</p>
                <p onClick={() => setCurrentSection('employeeDetails')}>Employee Details</p>
                <p onClick={() => setCurrentSection('productManagement')}>Product Management</p>
                <p onClick={() => setCurrentSection('liftManagement')}>Lift Management</p>
            </div>
            {currentSection === 'employeeDetails' && (
                <div className="updateEmployeeDetailsBox">
                    {employeeDetails && (
                        <div className="employeeDetails">
                            <h2>Current Employee Details</h2>
                            <p>Name: {employeeDetails.name}</p>
                            <p>Position: {employeeDetails.position}</p>
                        </div>
                    )}
                    <form onSubmit={handleUpdateEmployeeData}>
                        <h2>Update Employee Details</h2>
                        <div className="form-field">
                            <label>Name:</label>
                            <input type="text" value={formFields.name}
                                onChange={e => setFormFields({ ...formFields, name: e.target.value })} required />
                        </div>
                        <div className="form-field">
                            <label>Position:</label>
                            <input type="text" value={formFields.position}
                                onChange={e => setFormFields({ ...formFields, position: e.target.value })} required />
                        </div>
                        <button type="submit">Update</button>
                        <p>{successMessage}</p>
                    </form>
                </div>
            )}
            {currentSection === 'productManagement' && (
                <div className="productManagementBox">
                    <div className="column">
                        <form onSubmit={handleCreateProduct}>
                            <h2>Create Product</h2>
                            <div className="form-field">
                                <label>Name:</label>
                                <input type="text" value={createProductFormFields.name}
                                    onChange={e => setCreateProductFormFields({
                                        ...createProductFormFields,
                                        name: e.target.value
                                    })}
                                    required />
                            </div>
                            <div className="form-field">
                                <label>Description:</label>
                                <input type="text" value={createProductFormFields.description}
                                    onChange={e => setCreateProductFormFields({
                                        ...createProductFormFields,
                                        description: e.target.value
                                    })}
                                    required />
                            </div>
                            <div className="form-field">
                                <label>Price:</label>
                                <input type="number" value={createProductFormFields.price}
                                    onChange={e => setCreateProductFormFields({
                                        ...createProductFormFields,
                                        price: e.target.value
                                    })}
                                    required />
                            </div>
                            <div className="category-sort">
                                <div>
                                    <select name="category" value={createProductFormFields.category}
                                        onChange={e => setCreateProductFormFields({
                                            ...createProductFormFields,
                                            category: e.target.value
                                        })}
                                        className="category-dropdown">
                                        <option value="">Select category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="create-button">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="column">
                        <form onSubmit={handleUpdateProduct}>
                            <h2>Update Product</h2>
                            <div className="form-field">
                                <label>ID:</label>
                                <input type="text" value={productId}
                                    onChange={e => {
                                        setProductId(e.target.value);
                                        handleGetOneProduct(e.target.value);
                                    }} required />
                            </div>
                            <div className="form-field">
                                <label>Name:</label>
                                <input type="text" value={updateProductFormFields.name}
                                    onChange={e => setUpdateProductFormFields({
                                        ...updateProductFormFields,
                                        name: e.target.value
                                    })}
                                    placeholder="<leave empty for default>" />
                            </div>
                            <div className="form-field">
                                <label>Description:</label>
                                <input type="text" value={updateProductFormFields.description}
                                    onChange={e => setUpdateProductFormFields({
                                        ...updateProductFormFields,
                                        description: e.target.value
                                    })}
                                    placeholder="<leave empty for default>" />
                            </div>
                            <div className="form-field">
                                <label>Price:</label>
                                <input type="number" value={updateProductFormFields.price}
                                    onChange={e => setUpdateProductFormFields({
                                        ...updateProductFormFields,
                                        price: e.target.value
                                    })}
                                    placeholder="<leave empty for default>" />
                            </div>
                            <div className="category-sort">
                                <div>
                                    <select name="category" value={updateProductFormFields.category}
                                        onChange={e => setUpdateProductFormFields({
                                            ...updateProductFormFields,
                                            category: e.target.value
                                        })}
                                        className="category-dropdown">
                                        <option value="">Select category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="create-button">Update</button>
                                </div>
                            </div>
                            {selectedProduct && (
                                <div>
                                    <h3>{selectedProduct.name}</h3>
                                    <p>ID: {selectedProduct.id}</p>
                                    <p>{selectedProduct.description}</p>
                                    <p>{selectedProduct.price}</p>
                                </div>
                            )}
                        </form>
                    </div>
                    <form onSubmit={handleDeleteProduct}>
                        <h2>Delete Product</h2>
                        <div className="delete-field">
                            <div className="form-field">
                                <label>ID:</label>
                                <input type="text" value={deleteProductId}
                                    onChange={e => setDeleteProductId(e.target.value)} required />
                            </div>
                            <button type="submit" className="create-button delete-button">Delete</button>
                        </div>
                    </form>
                    <div className="productDisplayBox">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.id}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {currentSection === 'liftManagement' && (
                <div className="liftManagementBox">
                    {lifts.map((lift, index) => (
                        <div key={lift.id} className={`liftDetails liftDetails${index % 2 === 0 ? '1' : '2'}`}>
                            <div className="liftControlParent">
                                <div className="liftControlBox">
                                    <p>Lift {lift.id}</p>
                                    <button className="start" onClick={() => handleStartLift(lift.id)}>Start</button>
                                    <button className="stop" onClick={() => handleStopLift(lift.id)}>Stop</button>
                                </div>
                                {/* Display the lift status */}
                                <p>{liftStatus[lift.id]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Employee;