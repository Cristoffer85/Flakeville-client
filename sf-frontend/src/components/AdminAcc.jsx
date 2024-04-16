import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Admin() {
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [searchedUser, setSearchedUser] = useState(null);
    const [searched, setSearched] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateTelephone, setUpdateTelephone] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');

    const [employees, setEmployees] = useState([]);
    const [searchEmployeeUsername, setSearchEmployeeUsername] = useState('');
    const [searchedEmployee, setSearchedEmployee] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showUpdateEmployeeForm, setShowUpdateEmployeeForm] = useState(false);
    const [updateEmployeeName, setUpdateEmployeeName] = useState('');
    const [updateEmployeePosition, setUpdateEmployeePosition] = useState('');

    useEffect(() => {
        getAllUsers();
        getAllEmployees();
    }, []);

    const handleUserSearchSubmit = (event) => {
        event.preventDefault();
        fetchUser(searchUsername);
        setSearched(true);
    };

    const handleUserUpdateSubmit = async (event) => {
        event.preventDefault();
        // Get the updated user data from the form
        const updatedUser = {
            username: selectedUser.username, // Keep the current username
            password: selectedUser.password, // Keep the current password
            email: updateEmail,
            telephone: updateTelephone,
            birthday: updateBirthday,
            address: updateAddress
        };
        await updateUser(selectedUser.username, updatedUser);
        setShowUpdateForm(false);
    };

    const handleUserDeleteClick = async () => {
        await deleteUser(searchedUser.username);
        setSearchedUser(null);
    };

    const handleEmployeeSearchSubmit = (event) => {
        event.preventDefault();
        fetchEmployee(searchEmployeeUsername);
    };

    const handleEmployeeUpdateSubmit = async (event) => {
        event.preventDefault();
        // Get the updated employee data from the form
        const updatedEmployee = {
            name: updateEmployeeName,
            position: updateEmployeePosition
        };
        await updateEmployee(selectedEmployee.username, updatedEmployee);
        setShowUpdateEmployeeForm(false); // Hide the update form after updating
    };

    // #################### USERS ####################

    const getAllUsers = async () => {
        const token = Cookies.get('token');
        const response = await fetch('http://localhost:8080/admin/getAllUsers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUsers(data);

    };

    const fetchUser = async (username) => {
        const token = Cookies.get('token');
        const response = await fetch(`http://localhost:8080/admin/getOneUser/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok || response.headers.get('Content-Length') === '0') {
            setSearchedUser(null); // Set searchedUser to null if the user is not found
            return;
        }
        const data = await response.json();
        setSearchedUser(data); // Update the state with the fetched user data
    };

    const updateUser = async (username, user) => {
        const token = Cookies.get('token');
        const response = await fetch(`http://localhost:8080/admin/updateUser/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (response.ok) {
            setSearchedUser(data); // Update the searchedUser state with the updated user data
        } else {
            console.error('Update failed:', data);
        }
    };

    const deleteUser = async (username) => {
        const token = Cookies.get('token');
        await fetch(`http://localhost:8080/admin/deleteOneUser/${username}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Handle the deletion
    };

    // #################### EMPLOYEES ####################

    const getAllEmployees = async () => {
        const token = Cookies.get('token');
        const response = await fetch('http://localhost:8080/admin/getAllEmployees', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setEmployees(data);

    };

    const fetchEmployee = async (username) => {
        const token = Cookies.get('token');
        const response = await fetch(`http://localhost:8080/admin/getOneEmployee/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok || response.headers.get('Content-Length') === '0') {
            setSearchedEmployee(null); // Set searchedEmployee to null if the employee is not found
            return;
        }
        const data = await response.json();
        setSearchedEmployee(data); // Update the state with the fetched employee data
    };

    const updateEmployee = async (username, employee) => {
        const token = Cookies.get('token');
        const response = await fetch(`http://localhost:8080/admin/updateEmployee/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(employee)
        });
        const data = await response.json();
        if (response.ok) {
            setSearchedEmployee(data); // Update the searchedEmployee state with the updated employee data
        } else {
            console.error('Update failed:', data);
        }
    };

    const deleteEmployee = async (username) => {
        const token = Cookies.get('token');
        await fetch(`http://localhost:8080/admin/deleteOneEmployee/${username}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Handle the deletion
        setSearchedEmployee(null); // Set searchedEmployee to null after deletion
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <h2>Users</h2>
            {users.map(user => (
                <div key={user.id}>
                    <p>Username: {user.username}</p>
                    {/* Display other user properties as needed */}
                </div>
            ))}
            <h2>Employees</h2>
            {employees.map(employee => (
                <div key={employee.id}>
                    <p>Username: {employee.username}</p>
                    {/* Display other employee properties as needed */}
                </div>
            ))}
            <form onSubmit={handleUserSearchSubmit}>
                <input type="text" value={searchUsername} onChange={e => setSearchUsername(e.target.value)} placeholder="Search for a user" required />
                <button type="submit">Search</button>
            </form>
            {searched && ( // Check if a search has been made
                searchedUser ? (
                    <div>
                        <h2>Searched User</h2>
                        <p>Username: {searchedUser.username}</p>
                        {/* Display other user properties as needed */}
                        <button onClick={() => {setSelectedUser(searchedUser); setShowUpdateForm(true);}}>Update</button>
                        <button onClick={handleUserDeleteClick}>Delete</button>
                    </div>
                ) : (
                    <p>User not in database</p>
                )

            )}
            {showUpdateForm && (
                <form onSubmit={handleUserUpdateSubmit}>
                    <input type="email" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} placeholder="Update Email" required />
                    <input type="tel" value={updateTelephone} onChange={e => setUpdateTelephone(e.target.value)} placeholder="Update Telephone" required />
                    <input type="date" value={updateBirthday} onChange={e => setUpdateBirthday(e.target.value)} placeholder="Update Birthday" required />
                    <input type="text" value={updateAddress} onChange={e => setUpdateAddress(e.target.value)} placeholder="Update Address" required />
                    <button type="submit">Submit Update</button>
                </form>
            )}
            <form onSubmit={handleEmployeeSearchSubmit}>
                <input type="text" value={searchEmployeeUsername} onChange={e => setSearchEmployeeUsername(e.target.value)} placeholder="Search for an employee" required />
                <button type="submit">Search</button>
            </form>
            {searchedEmployee && (
                <div>
                    <h2>Searched Employee</h2>
                    <p>Username: {searchedEmployee.username}</p>
                    {/* Display other employee properties as needed */}
                    <button onClick={() => {
                        setSelectedEmployee(searchedEmployee);
                        setShowUpdateEmployeeForm(true);
                    }}>Update
                    </button>
                    <button onClick={() => deleteEmployee(searchedEmployee.username)}>Delete</button>
                </div>
            )}
            {showUpdateEmployeeForm && (
                <form onSubmit={handleEmployeeUpdateSubmit}>
                    <input type="text" value={updateEmployeeName} onChange={e => setUpdateEmployeeName(e.target.value)}
                           placeholder="Update Name" required/>
                    <input type="text" value={updateEmployeePosition} onChange={e => setUpdateEmployeePosition(e.target.value)} placeholder="Update Position" required />
                    <button type="submit">Submit Update</button>
                </form>
            )}
        </div>
    );
}

export default Admin;