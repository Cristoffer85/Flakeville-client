import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginUser } from '../../Api/AuthApi/AuthApi';
import { navigateBasedOnRole } from '../../Components/Router/Router.jsx';
import './SignInPage.css';

function SignInPage({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await loginUser(username, password);
            Cookies.set('token', data.jwt);
            handleLogin(data.user.username, data.jwt, data.role.authority);

            // Navigate to the respective page based on the user's role
            navigateBasedOnRole(data.role.authority, navigate);
        } catch (error) {
            console.log('Login failed:', error.message);
        }
    };

    return (
        <div className="signInPage">
            <form onSubmit={handleUserLogin}>
                <h3>Sign In</h3>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
                <span className="register-text">Not a user yet? Register </span>
                <Link to="/signup" className="register-button">here</Link>
            </form>
        </div>
    );
}

export default SignInPage;