import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../../../Api/UserApi/UserApi';
import '../UserAccount.css';

function UserDetails({ username }) {
    const [userDetails, setUserDetails] = useState({});
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateTelephone, setUpdateTelephone] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const data = await getUserDetails(username);
        setUserDetails(data);
        setUpdateEmail(data.email || '');
        setUpdateTelephone(data.telephone || '');
        setUpdateBirthday(data.birthday || '');
        setUpdateAddress(data.address || '');
    };

    const handleUpdateUserDetails = async (event) => {
        event.preventDefault();
        try {
            await updateUserDetails(username, updateEmail, updateTelephone, updateBirthday, updateAddress);
            fetchUserDetails(); // Fetch updated user details
            // Clear the form inputs
            setUpdateEmail('');
            setUpdateTelephone('');
            setUpdateBirthday('');
            setUpdateAddress('');
        } catch (error) {
            console.error('Failed to update user details:', error);
        }
    };

    return (
        <div className="userDetailsBox">
            <h2>User Details</h2>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>Telephone: {userDetails.telephone}</p>
            <p>Birthday: {userDetails.birthday}</p>
            <p>Address: {userDetails.address}</p>
            <form onSubmit={handleUpdateUserDetails}>
                <label>
                    Email:
                    <input type="email" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
                </label>
                <label>
                    Telephone:
                    <input type="tel" value={updateTelephone} onChange={(e) => setUpdateTelephone(e.target.value)} />
                </label>
                <label>
                    Birthday:
                    <input type="date" value={updateBirthday} onChange={(e) => setUpdateBirthday(e.target.value)} />
                </label>
                <label>
                    Address:
                    <input type="text" value={updateAddress} onChange={(e) => setUpdateAddress(e.target.value)} />
                </label>
                <button type="submit">Update Details</button>
            </form>
        </div>
    );
}

export default UserDetails;