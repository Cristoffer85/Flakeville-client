import React, { useState } from 'react';
import { getUser, createUser, updateUser, deleteUser } from '../../../Api/AdminApi/AdminApi.jsx';
import '../AdminAccount.css';

function AdminUserManagement({ users, setUsers, searchedUser, setSearchedUser }) {
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
                    {newUserMessage && <p>{newUserMessage}</p>}
            {updateUserMessage && <p>{updateUserMessage}</p>}
        </div>
    );
}

export default AdminUserManagement;