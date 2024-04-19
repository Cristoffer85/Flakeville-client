import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Account.css';
import {navigateBasedOnRole} from "./Router.jsx";

function Account({ isLoggedIn, handleLogin, handleLogout, setShowPopup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const popupRef = useRef();

    useEffect(() => {
        if (isLoggedIn && navigate) {
            const role = Cookies.get('role');
            const username = Cookies.get('username');
            navigateBasedOnRole(role, username, navigate);
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowPopup]);

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

    const handleUserLogout = () => {
        handleLogout();
        setShowPopup(false);
        navigate('/');
    };

    return (
        <div className="loginPopup" ref={popupRef}>
            <h2>Account</h2>
            {!isLoggedIn && (
                <form onSubmit={handleUserLogin}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            )}
            {isLoggedIn && <button onClick={handleUserLogout}>Logout</button>}
        </div>
    );
}

export default Account;