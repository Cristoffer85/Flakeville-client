import React, { useState, useEffect, useContext } from 'react';
import { getUserDetails, updateUserDetails } from '../../../Api/UserApi/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../../Contexts/AuthContext/AuthContext.jsx';

function UserDetails({ username }) {
    const { authState } = useContext(AuthContext);
    const { token } = authState;
    const [userDetails, setUserDetails] = useState({});
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateTelephone, setUpdateTelephone] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const data = await getUserDetails(username, token);
        setUserDetails(data);
        setUpdateEmail(data.email || '');
        setUpdateTelephone(data.telephone || '');
        setUpdateBirthday(data.birthday || '');
        setUpdateAddress(data.address || '');
    };

    const handleUpdateUserDetails = async (event) => {
        event.preventDefault();
        try {
            await updateUserDetails(username, updateEmail, updateTelephone, updateBirthday, updateAddress, token);
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
        <div className="container">
            <h2 className="mb-4">User Details</h2>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Telephone:</strong> {userDetails.telephone}</p>
            <p><strong>Birthday:</strong> {userDetails.birthday}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
            <form onSubmit={handleUpdateUserDetails}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telephone:</label>
                    <input type="tel" className="form-control" value={updateTelephone} onChange={(e) => setUpdateTelephone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Birthday:</label>
                    <input type="date" className="form-control" value={updateBirthday} onChange={(e) => setUpdateBirthday(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input type="text" className="form-control" value={updateAddress} onChange={(e) => setUpdateAddress(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Details</button>
            </form>
        </div>
    );
}

export default UserDetails;