import React, { useState, useContext } from 'react';
import EmployeeDetails from './EMPLOYEEDETAILS2/EMPLOYEEDETAILS2.jsx';
import ProductManagement from './PRODUCTMANAGEMENT2/PRODUCTMANAGEMENT2.jsx';
import LiftManagement from './LIFTMANAGEMENT2/LIFTMANAGEMENT2.jsx';
import Chat from '../../COMPONENTS2/CHAT2/CHAT2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../CONTEXTS2/AUTHCONTEXT2/AUTHCONTEXT2.jsx';

function EmployeeAccount() {
    const { authState } = useContext(AuthContext);
    const { username } = authState;
    const [currentSection, setCurrentSection] = useState('employeeDetails');

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem' }}>
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