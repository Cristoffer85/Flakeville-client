import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

function User() {
    const username = localStorage.getItem('username');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token and username from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        // Redirect the user back to the login page
        navigate('/account');
    };


    // Fetch the user's data when the component mounts
    useEffect(() => {
        fetchUserData().catch(error => console.error('Error:', error));
    }, []);

    const fetchUserData = async () => {
        // Fetch the user's data from the server
        // Update the state variables with the fetched data
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        try {
            const response = await fetch(`http://localhost:8080/user/${username}`, { // Use the username state variable
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the user's authentication token
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
            <p>Welcome, user! You can manage your account from here.</p>
            <form onSubmit={handleUpdate}>
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required/>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required/>
                <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} required/>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <button type="submit">Update</button>
                <button onClick={handleLogout}>Logout</button>
            </form>
        </div>
    );

}

export default User;