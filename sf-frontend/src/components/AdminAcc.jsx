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

    useEffect(() => {
        getAllUsers();
        getAllEmployees();
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchUser(searchUsername);
        setSearched(true);
    };

    const handleUpdateSubmit = async (event) => {
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

    const handleDeleteClick = async () => {
        await deleteUser(searchedUser.username);
        setSearchedUser(null);
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
            <form onSubmit={handleSearchSubmit}>
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
                        <button onClick={handleDeleteClick}>Delete</button>
                    </div>
                ) : (
                    <p>User not in database</p>
                )
            )}
            {showUpdateForm && (
                <form onSubmit={handleUpdateSubmit}>
                    <input type="email" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} placeholder="Update Email" required />
                    <input type="tel" value={updateTelephone} onChange={e => setUpdateTelephone(e.target.value)} placeholder="Update Telephone" required />
                    <input type="date" value={updateBirthday} onChange={e => setUpdateBirthday(e.target.value)} placeholder="Update Birthday" required />
                    <input type="text" value={updateAddress} onChange={e => setUpdateAddress(e.target.value)} placeholder="Update Address" required />
                    <button type="submit">Submit Update</button>
                </form>
            )}
        </div>
    );
}

export default Admin;