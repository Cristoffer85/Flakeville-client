import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/SignUp.css';

function SignUp({ switchToSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);

    const handleUserRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                setIsRegistered(true);
                setUsernameTaken(false);
            } else {
                // If the response is not ok, handle the error
                console.log('Registration failed:', response.status);
                if (response.status === 401) {
                    setUsernameTaken(true);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const checkUsername = async () => {
        try {
            const response = await fetch(`https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/auth/checkUsername/${username}`);
            if (response.status === 409) {
                setUsernameTaken(true);
            } else {
                setUsernameTaken(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="signUp-box">
            {!isRegistered ? (
                <form onSubmit={handleUserRegister}>
                    <h3>Sign Up</h3>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} onBlur={checkUsername} placeholder="Username"
                           required className={usernameTaken ? "username-input-error" : ""}/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                           placeholder="Password" required/>
                    <button type="submit">Register</button>
                    {usernameTaken && <p className="username-taken-box">Username taken, please choose another</p>}
                </form>
            ) : (
                <div className="confirmation-container">
                    <p><b>User registered!</b></p>
                    <p>Sign in?</p>
                    <p><Link onClick={switchToSignIn}><b>Click here</b></Link></p>
                </div>
            )}
        </div>
    );
}

export default SignUp;