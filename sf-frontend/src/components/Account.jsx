import React, { useState } from 'react';

function Account() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        console.log('Form submitted');
        console.log('Username:', username);
        console.log('Password:', password);

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            console.log('Response:', response);

            const data = await response.json();

            console.log('Data:', data);

            if (response.ok) {
                // Login was successful
                // Save the token and user data in the state or local storage
                console.log('Login successful:', data);
            } else {
                // Login failed
                console.log('Login failed:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Account Page</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Account;