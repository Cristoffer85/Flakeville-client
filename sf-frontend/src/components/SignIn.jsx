import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { navigateBasedOnRole } from "./Router.jsx";
import './css/SignIn.css';

function SignIn({ setShowPopup, handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                setShowPopup(false);
                Cookies.set('token', data.jwt);
                handleLogin(data.user.username, data.jwt, data.role.authority);

                // Navigate to the respective page based on the user's role
                navigateBasedOnRole(data.role.authority, data.user.username, navigate);
            } else {
                console.log('Login failed:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="signIn-box">
        <form onSubmit={handleUserLogin}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default SignIn;