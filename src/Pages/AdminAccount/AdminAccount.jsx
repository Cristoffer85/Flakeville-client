import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    createEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
} from '../../Api/AdminApi/AdminApi';

import './AdminAccount.css';

function Admin() {
    const username = Cookies.get('username');
    const [currentSection, setCurrentSection] = React.useState('employeeManagement');
    const [searched, setSearched] = useState(false);

    const [users, setUsers] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUserMessage, setNewUserMessage] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [searchedUser, setSearchedUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateTelephone, setUpdateTelephone] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');

    const [employees, setEmployees] = useState([]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeePosition, setNewEmployeePosition] = useState('');
    const [newEmployeeUsername, setNewEmployeeUsername] = useState('');
    const [newEmployeePassword, setNewEmployeePassword] = useState('');
    const [newEmployeeMessage, setNewEmployeeMessage] = useState('');
    const [searchEmployeeUsername, setSearchEmployeeUsername] = useState('');
    const [searchedEmployee, setSearchedEmployee] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showUpdateEmployeeForm, setShowUpdateEmployeeForm] = useState(false);
    const [updateEmployeeName, setUpdateEmployeeName] = useState('');
    const [updateEmployeePosition, setUpdateEmployeePosition] = useState('');

    useEffect(() => {
        getAllUsers().then(setUsers);
        getAllEmployees().then(setEmployees);
    }, []);

    // #################### HELPER METHODS ####################

    const userSearchSubmit = (event) => {
        event.preventDefault();
        getUser(searchUsername).then(setSearchedUser);
        setSearched(true);
    };
    const userNewSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            username: newUsername,
            password: newPassword
        };
        try {
            const createdUser = await createUser(newUser);
            setUsers([...users, createdUser]);
            setNewUserMessage('New user created');
            setNewUsername('');
            setNewPassword('');
        } catch (error) {
            console.error(error);
        }
    };
    const userUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            username: selectedUser.username,
            password: selectedUser.password,
            email: updateEmail,
            telephone: updateTelephone,
            birthday: updateBirthday,
            address: updateAddress
        };
        try {
            const updatedUserData = await updateUser(selectedUser.username, updatedUser);
            setSearchedUser(updatedUserData);
            setShowUpdateForm(false);
        } catch (error) {
            console.error(error);
        }
    };
    const userDeleteClick = async () => {
        try {
            await deleteUser(searchedUser.username);
            setSearchedUser(null);
        } catch (error) {
            console.error(error);
        }
    };
    const employeeSearchSubmit = (event) => {
        event.preventDefault();
        getEmployee(searchEmployeeUsername).then(setSearchedEmployee);
        setSearched(true);
    };
    const employeeNewSubmit = async (event) => {
        event.preventDefault();
        const newEmployee = {
            name: newEmployeeName,
            position: newEmployeePosition,
            username: newEmployeeUsername,
            password: newEmployeePassword
        };
        try {
            const createdEmployee = await createEmployee(newEmployee);
            setEmployees([...employees, createdEmployee]);
            setNewEmployeeMessage('New employee created');
            setNewEmployeeName('');
            setNewEmployeePosition('');
            setNewEmployeeUsername('');
            setNewEmployeePassword('');
        } catch (error) {
            console.error(error);
        }
    };
    const employeeUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedEmployee = {
            name: updateEmployeeName,
            position: updateEmployeePosition
        };
        try {
            const updatedEmployeeData = await updateEmployee(selectedEmployee.username, updatedEmployee);
            setSearchedEmployee(updatedEmployeeData);
            setShowUpdateEmployeeForm(false);
        } catch (error) {
            console.error(error);
        }
    };
    const employeeDeleteClick = async () => {
        try {
            await deleteEmployee(searchedEmployee.username);
            setSearchedEmployee(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="accountContainer">
            <div className="sidebar">
                <p className="welcome-message">Welcome, {username}!</p>
                <p onClick={() => setCurrentSection('employeeManagement')}>Employee Management</p>
                <p onClick={() => setCurrentSection('userManagement')}>User Management</p>
            </div>

            {currentSection === 'employeeManagement' && (
                <div className="employeeManagementBox">
                    <h2>Employees</h2>
                    {employees.map(employee => (
                        <div key={employee.id} className="employeeDetails">
                            <p>Username: {employee.username}</p>
                        </div>
                    ))}
                    <h2>Search Employees</h2>
                    <form onSubmit={employeeSearchSubmit}>
                        <input type="text" value={searchEmployeeUsername}
                               onChange={e => setSearchEmployeeUsername(e.target.value)} placeholder="Search for an employee"
                               required/>
                        <button type="submit">Search</button>
                    </form>
                    {searched && (
                        searchedEmployee ? (
                            <div>
                                <h2>Searched Employee</h2>
                                <p>Username: {searchedEmployee.username}</p>
                                <button onClick={() => {
                                    setSelectedEmployee(searchedEmployee);
                                    setShowUpdateEmployeeForm(true);
                                }}>Update
                                </button>
                                <button onClick={employeeDeleteClick}>Delete</button>
                            </div>
                        ) : (
                            <p>Employee not in database</p>
                        )
                    )}
                    {showUpdateEmployeeForm && (
                        <form onSubmit={employeeUpdateSubmit}>
                            <input type="text" value={updateEmployeeName} onChange={e => setUpdateEmployeeName(e.target.value)}
                                   placeholder="Update Name" required/>
                            <input type="text" value={updateEmployeePosition}
                                   onChange={e => setUpdateEmployeePosition(e.target.value)} placeholder="Update Position"
                                   required/>
                            <button type="submit">Submit Update</button>
                        </form>
                    )}
                    <h2>Create New Employee</h2>
                    <form onSubmit={employeeNewSubmit}>
                        <input type="text" value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)}
                               placeholder="Name" required/>
                        <input type="text" value={newEmployeePosition} onChange={e => setNewEmployeePosition(e.target.value)}
                               placeholder="Position" required/>
                        <input type="text" value={newEmployeeUsername} onChange={e => setNewEmployeeUsername(e.target.value)}
                               placeholder="Username" required/>
                        <input type="password" value={newEmployeePassword}
                               onChange={e => setNewEmployeePassword(e.target.value)} placeholder="Password" required/>
                        <button type="submit">Create</button>
                    </form>
                    <p>{newEmployeeMessage}</p>
                </div>
            )}

            {currentSection === 'userManagement' && (
                <div className="userManagementBox">
                    <h2>Users</h2>
                    {users.map(user => (
                        <div key={user.id} className="userDetails">
                            <p>Username: {user.username}</p>
                        </div>
                    ))}
                    <h2>Search Users</h2>
                    <form onSubmit={userSearchSubmit}>
                        <input type="text" value={searchUsername}
                               onChange={e => setSearchUsername(e.target.value)} placeholder="Search for a user"
                               required/>
                        <button type="submit">Search</button>
                    </form>
                    {searched && (
                        searchedUser ? (
                            <div>
                                <h2>Searched User</h2>
                                <p>Username: {searchedUser.username}</p>
                                <button onClick={() => {
                                    setSelectedUser(searchedUser);
                                    setShowUpdateForm(true);
                                }}>Update
                                </button>
                                <button onClick={userDeleteClick}>Delete</button>
                            </div>
                        ) : (
                            <p>User not in database</p>
                        )
                    )}
                    {showUpdateForm && (
                        <form onSubmit={userUpdateSubmit}>
                            <input type="text" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)}
                                   placeholder="Update Email" required/>
                            <input type="text" value={updateTelephone}
                                   onChange={e => setUpdateTelephone(e.target.value)} placeholder="Update Telephone"
                                   required/>
                            <input type="text" value={updateBirthday}
                                   onChange={e => setUpdateBirthday(e.target.value)} placeholder="Update Birthday"
                                   required/>
                            <input type="text" value={updateAddress}
                                   onChange={e => setUpdateAddress(e.target.value)} placeholder="Update Address"
                                   required/>
                            <button type="submit">Submit Update</button>
                        </form>
                    )}
                    <h2>Create New User</h2>
                    <form onSubmit={userNewSubmit}>
                        <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)}
                               placeholder="Username" required/>
                        <input type="password" value={newPassword}
                               onChange={e => setNewPassword(e.target.value)} placeholder="Password" required/>
                        <button type="submit">Create</button>
                    </form>
                    <p>{newUserMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Admin;