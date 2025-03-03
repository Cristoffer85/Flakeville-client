import React, { useState } from 'react';
import Cookies from 'js-cookie';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails.jsx';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import LiftManagement from './LiftManagement/LiftManagement.jsx';
import Chat from '../../Components/Chat/Chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeAccount() {
    const username = Cookies.get('username');
    const [currentSection, setCurrentSection] = useState('employeeDetails');

    return (
        <div className="container-fluid" style={{ marginTop: '7rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
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
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'chat' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('chat')}
                        >
                            Chat
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
                    {currentSection === 'chat' && (
                        <div className="card">
                            <div className="card-body">
                                <Chat />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeeAccount;