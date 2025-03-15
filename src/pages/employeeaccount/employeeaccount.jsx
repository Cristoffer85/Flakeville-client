import React, { useState, useContext } from 'react';
import EmployeeDetails from './employeedetails/employeedetails.jsx';
import ProductManagement from './productmanagement/productmanagement.jsx';
import LiftManagement from './liftmanagement/liftmanagement.jsx';
import CreateProduct from './productmanagement/createproduct/createproduct.jsx';
import UpdateProduct from './productmanagement/updateproduct/updateproduct.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

function EmployeeAccount() {
    const { authState } = useContext(AuthContext);
    const { username } = authState;
    const [currentSection, setCurrentSection] = useState('employeeDetails');
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const handleEditProduct = (product) => {
        setShowCreateProduct(false);
        setShowUpdateProduct(true);
        setProductToEdit(product);
    };

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active">Welcome, {username}!</p>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'employeeDetails' ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentSection('employeeDetails');
                                setShowCreateProduct(false);
                                setShowUpdateProduct(false);
                            }}
                        >
                            Employee Details
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'productManagement' ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentSection('productManagement');
                                setShowCreateProduct(false);
                                setShowUpdateProduct(false);
                            }}
                        >
                            Product Management
                        </button>
                        {currentSection === 'productManagement' && (
                            <button
                                type="button"
                                className={`list-group-item list-group-item-action ${showCreateProduct ? 'active' : ''}`}
                                onClick={() => {
                                    setShowCreateProduct(true);
                                    setShowUpdateProduct(false);
                                }}
                                style={{ fontSize: '0.875rem' }} // Adjust font size here
                            >
                                - Create Product
                            </button>
                        )}
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'liftManagement' ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentSection('liftManagement');
                                setShowCreateProduct(false);
                                setShowUpdateProduct(false);
                            }}
                        >
                            Lift Management
                        </button>
                    </div>
                    {showCreateProduct && (
                        <div className="mt-4 position-relative">
                            <CreateProduct onClose={() => setShowCreateProduct(false)} />
                        </div>
                    )}
                    {showUpdateProduct && productToEdit && (
                        <div className="mt-4 position-relative">
                            <UpdateProduct product={productToEdit} onClose={() => setShowUpdateProduct(false)} />
                        </div>
                    )}
                </div>
                <div className="col-md-9 overflow-auto" style={{ maxHeight: 'calc(80vh - 7rem)', height: '80vh' }}>
                    {currentSection === 'employeeDetails' && (
                        <div className="card">
                            <div className="card-body">
                                <EmployeeDetails username={username} />
                            </div>
                        </div>
                    )}
                    {currentSection === 'productManagement' && (
                        <div className="card">
                            <div className="card-body">
                                <ProductManagement onEditProduct={handleEditProduct} />
                            </div>
                        </div>
                    )}
                    {currentSection === 'liftManagement' && (
                        <div className="card">
                            <div className="card-body">
                                <LiftManagement />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeeAccount;