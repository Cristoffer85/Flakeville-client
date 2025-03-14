import React, { useState, useEffect, useContext } from 'react';
import UserManagement from './USERMANAGEMENT2/USERMANAGEMENT2.js';
import EmployeeManagement from './EMPLOYEEMANAGEMENT2/EMPLOYEEMANAGEMENT2.js';
import { getAllUsers, getAllEmployees } from '../../API2/ADMINAPI2/ADMINAPI2.js';
import Chat from '../../COMPONENTS2/CHAT2/CHAT2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../CONTEXTS2/AUTHCONTEXT2/AUTHCONTEXT2.js';

function AdminAccount() {
    const { authState } = useContext(AuthContext);
    const { username, token } = authState;
    const [currentSection, setCurrentSection] = useState('userManagement');
    const [users, setUsers] = useState([]);
    const [searchedUser, setSearchedUser] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [searchedEmployee, setSearchedEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getAllUsers(token);
                setUsers(usersData);
                const employeesData = await getAllEmployees(token);
                setEmployees(employeesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active">Welcome, {username}!</p>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'employeeManagement' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('employeeManagement')}
                        >
                            Employee Management
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'userManagement' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('userManagement')}
                        >
                            User Management
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
                    {currentSection === 'userManagement' && (
                        <div className="card">
                            <div className="card-body">
                                <UserManagement
                                    users={users}
                                    setUsers={setUsers}
                                    searchedUser={searchedUser}
                                    setSearchedUser={setSearchedUser}
                                />
                            </div>
                        </div>
                    )}
                    {currentSection === 'employeeManagement' && (
                        <div className="card">
                            <div className="card-body">
                                <EmployeeManagement
                                    employees={employees}
                                    setEmployees={setEmployees}
                                    searchedEmployee={searchedEmployee}
                                    setSearchedEmployee={setSearchedEmployee}
                                />
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

export default AdminAccount;