import React, { useState, useEffect } from 'react';

function User() {
    const [username, setUsername] = useState('user');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

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

        try {
            const response = await fetch(`http://localhost:8080/user/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
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
            <p>Welcome, User! You can manage your account from here.</p>
            <form onSubmit={handleUpdate}>
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required />
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
                <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} required />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default User;