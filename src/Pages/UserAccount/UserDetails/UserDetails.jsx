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
    };

    const handleUpdateUserDetails = async (event) => {
        event.preventDefault();
        await updateUserDetails(username, updateEmail, updateTelephone, updateBirthday, updateAddress);
        fetchUserDetails(); // Refresh user details after update
    };

    return (
        <div className="userDetailsBox">
            <h2>User Details</h2>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>Telephone: {userDetails.telephone}</p>
            <p>Birthday: {userDetails.birthday}</p>
            <p>Address: {userDetails.address}</p>
            <h2>Update User Details</h2>
            <form onSubmit={handleUpdateUserDetails}>
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
        </div>
    );
}

export default UserDetails;