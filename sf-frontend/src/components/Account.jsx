import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                console.log('Server response:', data);
                // Save the token and user data in the state or local storage
                console.log('Login successful:', data);
                localStorage.setItem('token', data.jwt);

                // Redirect based on authority

                console.log('Role:', data.role);

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