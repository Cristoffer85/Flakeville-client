import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Account.css';

function Account({ isLoggedIn, handleLogin, handleLogout, setShowPopup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const popupRef = useRef(); // Create a ref for the popup

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/user/${Cookies.get('username')}`);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        // Function to check if clicked outside of popup
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }

        // Add the event listener when the component is mounted
        document.addEventListener("mousedown", handleClickOutside);
        // Clean up the event listener on component unmount
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
                handleLogin(data.user.username, data.jwt);

                switch (data.role.authority) {
                    case 'ADMIN':
                        navigate('/admin');
                        break;
                    case 'EMPLOYEE':
                        navigate('/employee');
                        break;
                    case 'USER':
                        navigate(`/user/${data.user.username}`);
                        break;
                    default:
                        console.log('Unknown role:', data.role.authority);
                }
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