import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import './UserAcc.css';

function User({ isLoggedIn }) {
    const username = useContext(UserContext);
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const token = Cookies.get('token'); // Get the token from cookies

        const response = await fetch(`http://localhost:8080/user/getOneUser/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        const data = await response.json();
        setUserDetails(data);
    };

    useEffect(() => {
        fetchUserData().catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/account');
        }
    }, [isLoggedIn]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const token = Cookies.get('token');

        try {
            const response = await fetch(`http://localhost:8080/user/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ birthday, address, telephone, email })
            });

            if (response.ok) {
                console.log('Update successful');
                fetchUserData(); // Fetch the updated user details
            } else {
                console.log('Update failed:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="userAccPageTitleAlign">
                <h1 className="pageTitle">USER ACCOUNT PAGE</h1>
            </div>

            <div className="updateUserDetailsBox">
                {userDetails && (
                    <div className="userDetails">
                        <h2>Current User Details</h2>
                        <p>Birthday: {userDetails.birthday}</p>
                        <p>Address: {userDetails.address}</p>
                        <p>Telephone: {userDetails.telephone}</p>
                        <p>Email: {userDetails.email}</p>
                    </div>
                )}
                <form onSubmit={handleUpdate}>
                    <h2>Update User Details</h2>
                    <div className="form-field">
                        <label>Birthday:</label>
                        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Address:</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Telephone:</label>
                        <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    );
}

export default User;