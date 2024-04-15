import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

function User({ isLoggedIn }) {
    const username = useContext(UserContext);
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const fetchUserData = async () => {};

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
            } else {
                console.log('Update failed:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome, {username}! You can manage your account from here.</p>
            <form onSubmit={handleUpdate}>
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required/>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required/>
                <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} required/>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default User;