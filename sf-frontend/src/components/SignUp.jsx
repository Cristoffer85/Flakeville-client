import React, { useState } from 'react';
import './css/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                // You can add more logic here after successful registration
            } else {
                console.log('Registration failed:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="signUp-box">
        <form onSubmit={handleUserRegister}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default SignUp;