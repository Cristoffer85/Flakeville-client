import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import AdminUserManagement from '../../Pages/AdminAccount/AdminUserManagement/AdminUserManagement.jsx';
import AdminEmployeeManagement from '../../Pages/AdminAccount/AdminEmployeeManagement/AdminEmployeeManagement.jsx';
import { getAllUsers, getAllEmployees } from '../../Api/AdminApi/AdminApi.jsx';

import './AdminAccount.css';

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
        <div className="accountContainer">
            <div className="sidebar">
                <p className="welcome-message">Welcome, {username}!</p>
                <p onClick={() => setCurrentSection('employeeManagement')}>Employee Management</p>
                <p onClick={() => setCurrentSection('userManagement')}>User Management</p>
            </div>

            {currentSection === 'userManagement' && (
                <AdminUserManagement
                    users={users}
                    setUsers={setUsers}
                    searchedUser={searchedUser}
                    setSearchedUser={setSearchedUser}
                />
            )}

            {currentSection === 'employeeManagement' && (
                <AdminEmployeeManagement
                    employees={employees}
                    setEmployees={setEmployees}
                    searchedEmployee={searchedEmployee}
                    setSearchedEmployee={setSearchedEmployee}
                />
            )}
        </div>
    );
}

export default AdminAccount;