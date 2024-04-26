import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import './css/EmployeeAccount.css';
import { createProduct, updateProduct, deleteProduct } from '../components/Products.jsx';

function Employee() {
    const username = Cookies.get('username');
    const [employeeDetails, setEmployeeDetails] = useState({name: '', position: ''});
    const [formFields, setFormFields] = useState({name: '', position: ''});
    const [successMessage, setSuccessMessage] = useState('');
    const [createProductFormFields, setCreateProductFormFields] = useState({name: '', description: '', price: ''});
    const [updateProductFormFields, setUpdateProductFormFields] = useState({Id: '', name: '', description: '', price: ''});
    const [deleteProductId, setDeleteProductId] = useState('');
    const [productId, setProductId] = useState('');
    useNavigate();

    useEffect(() => {
        getEmployeeData().catch(error => console.error('Error:', error));
    }, []);

    const getEmployeeData = async () => {

        const token = Cookies.get('token'); // Get the token from cookies

        const response = await fetch(`http://localhost:8080/employee/getOneEmployee/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;

        }
        const data = await response.json();
        setEmployeeDetails(data);

    };

    const updateEmployeeData = async (event) => {
        event.preventDefault();

        const token = Cookies.get('token');

        try {
            const response = await fetch(`http://localhost:8080/employee/updateEmployee/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formFields)
            });

            if (response.ok) {
                console.log('Update successful');
                setSuccessMessage('Information updated');
                setFormFields({name: '', position: ''}); // Clear the form
                getEmployeeData(); // Fetch the updated employee details
            } else {
                console.log('Update failed:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCreateProduct = async (event) => {
        event.preventDefault();
        await createProduct(createProductFormFields);
        setCreateProductFormFields({name: '', description: '', price: ''}); // Clear the form
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        await updateProduct(productId, updateProductFormFields);
        setUpdateProductFormFields({Id: '', name: '', description: '', price: ''}); // Clear the form
    };

    const handleDeleteProduct = async (event) => {
        event.preventDefault();
        await deleteProduct(deleteProductId);
        setDeleteProductId(''); // Clear the form
    };

    return (
        <div className="employeeAccountContainer">
            <div className="updateEmployeeDetailsBox">
                <p>Welcome, {username}!</p>
                {employeeDetails && (
                    <div className="employeeDetails">
                        <h2>Current Employee Details</h2>
                        <p>Name: {employeeDetails.name}</p>
                        <p>Position: {employeeDetails.position}</p>
                    </div>
                )}
                <form onSubmit={updateEmployeeData}>
                    <h2>Update Employee Details</h2>
                    <div className="form-field">
                        <label>Name:</label>
                        <input type="text" value={formFields.name}
                               onChange={e => setFormFields({...formFields, name: e.target.value})} required/>
                    </div>
                    <div className="form-field">
                        <label>Position:</label>
                        <input type="text" value={formFields.position}
                               onChange={e => setFormFields({...formFields, position: e.target.value})} required/>
                    </div>
                    <button type="submit">Update</button>
                    <p>{successMessage}</p>
                </form>
            </div>
            <div className="productManagementBox">
                <form onSubmit={handleCreateProduct}>
                    <h2>Create Product</h2>
                    <div className="form-field">
                        <label>Name:</label>
                        <input type="text" value={createProductFormFields.name}
                               onChange={e => setCreateProductFormFields({...createProductFormFields, name: e.target.value})}
                               required/>
                    </div>
                    <div className="form-field">
                        <label>Description:</label>
                        <input type="text" value={createProductFormFields.description}
                               onChange={e => setCreateProductFormFields({...createProductFormFields, description: e.target.value})}
                               required/>
                    </div>
                    <div className="form-field">
                        <label>Price:</label>
                        <input type="number" value={createProductFormFields.price}
                               onChange={e => setCreateProductFormFields({...createProductFormFields, price: e.target.value})}
                               required/>
                    </div>
                    <button type="submit">Create</button>
                </form>
                <form onSubmit={handleUpdateProduct}>
                    <h2>Update Product</h2>
                    <div className="form-field">
                        <label>ID:</label>
                        <input type="text" value={productId}
                               onChange={e => setProductId(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Name:</label>
                        <input type="text" value={updateProductFormFields.name}
                               onChange={e => setUpdateProductFormFields({...updateProductFormFields, name: e.target.value})}
                               required/>
                    </div>
                    <div className="form-field">
                        <label>Description:</label>
                        <input type="text" value={updateProductFormFields.description}
                               onChange={e => setUpdateProductFormFields({...updateProductFormFields, description: e.target.value})}
                               required/>
                    </div>
                    <div className="form-field">
                        <label>Price:</label>
                        <input type="number" value={updateProductFormFields.price}
                               onChange={e => setUpdateProductFormFields({...updateProductFormFields, price: e.target.value})}
                               required/>
                    </div>
                    <button type="submit">Update</button>
                </form>
                <form onSubmit={handleDeleteProduct}>
                    <h2>Delete Product</h2>
                    <div className="form-field">
                        <label>ID:</label>
                        <input type="text" value={deleteProductId}
                               onChange={e => setDeleteProductId(e.target.value)} required/>
                    </div>
                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    );
}

export default Employee;