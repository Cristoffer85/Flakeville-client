import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import UserManagement from './UserManagement/UserManagement.jsx';
import EmployeeManagement from './EmployeeManagement/EmployeeManagement.jsx';
import { getAllUsers, getAllEmployees } from '../../Api/AdminApi/AdminApi.jsx';
import Chat from '../../Components/Chat/Chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminAccount() {
    const username = Cookies.get('username');
    const [currentSection, setCurrentSection] = useState('userManagement');
    const [users, setUsers] = useState([]);
    const [searchedUser, setSearchedUser] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [searchedEmployee, setSearchedEmployee] = useState(null);

    useEffect(() => {
        getAllUsers().then(setUsers);
        getAllEmployees().then(setEmployees);
    }, []);

    return (
        <div className="container-fluid" style={{ marginTop: '7rem' }}>
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