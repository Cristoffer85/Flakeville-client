import React, { useState } from 'react';
import { getUser, createUser, updateUser, deleteUser } from '../../../API2/ADMINAPI2/ADMINAPI2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManagement({ users, setUsers, searchedUser, setSearchedUser }) {
    const [searchUsername, setSearchUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateTelephone, setUpdateTelephone] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [searched, setSearched] = useState(false);
    const [newUserMessage, setNewUserMessage] = useState('');
    const [updateUserMessage, setUpdateUserMessage] = useState('');

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
            setNewUsername('');
            setNewPassword('');
            setNewUserMessage('User created successfully!');
        } catch (error) {
            console.error(error);
            setNewUserMessage('Error creating user.');
        }
    };

    const userUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            username: searchedUser.username,
            email: updateEmail,
            telephone: updateTelephone,
            birthday: updateBirthday,
            address: updateAddress
        };
        try {
            const updatedUserData = await updateUser(searchedUser.username, updatedUser);
            setSearchedUser(updatedUserData);
            setShowUpdateForm(false);
            setUpdateUserMessage('User updated successfully!');
        } catch (error) {
            console.error(error);
            setUpdateUserMessage('Error updating user.');
        }
    };

    const userDeleteClick = async () => {
        try {
            await deleteUser(searchedUser.username);
            setSearchedUser(null);
            setUpdateUserMessage('User deleted successfully!');
        } catch (error) {
            console.error(error);
            setUpdateUserMessage('Error deleting user.');
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">User Management</h2>
            <ul className="list-group mb-4">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">
                        Username: {user.username}
                    </li>
                ))}
            </ul>
            <h2 className="mb-4">Search Users</h2>
            <form onSubmit={userSearchSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={searchUsername}
                        onChange={e => setSearchUsername(e.target.value)}
                        placeholder="Search for a user"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            {searched && (
                searchedUser ? (
                    <div>
                        <h2>Searched User</h2>
                        <p>Username: {searchedUser.username}</p>
                        <button onClick={() => {
                            setSearchedUser(searchedUser);
                            setShowUpdateForm(true);
                        }} className="btn btn-secondary me-2">Update</button>
                        <button onClick={userDeleteClick} className="btn btn-danger">Delete</button>
                    </div>
                ) : (
                    <p>User not in database</p>
                )
            )}
            {showUpdateForm && (
                <form onSubmit={userUpdateSubmit} className="mb-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={updateEmail}
                            onChange={e => setUpdateEmail(e.target.value)}
                            placeholder="Update Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={updateTelephone}
                            onChange={e => setUpdateTelephone(e.target.value)}
                            placeholder="Update Telephone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={updateBirthday}
                            onChange={e => setUpdateBirthday(e.target.value)}
                            placeholder="Update Birthday"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={updateAddress}
                            onChange={e => setUpdateAddress(e.target.value)}
                            placeholder="Update Address"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Update</button>
                </form>
            )}
            <h2 className="mb-4">Create New User</h2>
            <form onSubmit={userNewSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newUsername}
                        onChange={e => setNewUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            {newUserMessage && <p>{newUserMessage}</p>}
            {updateUserMessage && <p>{updateUserMessage}</p>}
        </div>
    );
}

export default UserManagement;