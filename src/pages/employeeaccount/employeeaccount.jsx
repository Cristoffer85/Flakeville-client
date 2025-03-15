import React, { useState, useContext } from 'react';
import EmployeeDetails from './employeedetails/employeedetails.jsx';
import ProductManagement from './productmanagement/productmanagement.jsx';
import LiftManagement from './liftmanagement/liftmanagement.jsx';
import Chat from '../../components/chat/chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

function EmployeeAccount() {
    const { authState } = useContext(AuthContext);
    const { username } = authState;
    const [currentSection, setCurrentSection] = useState('employeeDetails');

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active">Welcome, {username}!</p>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'employeeDetails' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('employeeDetails')}
                        >
                            Employee Details
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'productManagement' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('productManagement')}
                        >
                            Product Management
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'liftManagement' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('liftManagement')}
                        >
                            Lift Management
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
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
                                <ProductManagement />
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