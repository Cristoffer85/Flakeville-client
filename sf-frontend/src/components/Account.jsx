import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Account({ isLoggedIn, handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/user/${localStorage.getItem('username')}`);
        }
    }, [isLoggedIn]); // add isLoggedIn as a dependency

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

            console.log('Response data:', data); // add this line

            if (response.ok) {
                localStorage.setItem('token', data.jwt);
                handleLogin(data.user.username); // update this line

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

    return (
        <div>
            <h1>Account Page</h1>
            <form onSubmit={handleUserLogin}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Account;