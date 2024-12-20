import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Api/AuthApi/AuthApi';
import './SignUp.css';

function SignUp({ switchToSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);

    const handleUserRegister = async (event) => {
        event.preventDefault();

        try {
            const data = await registerUser(username, password);
            console.log('Registration successful:', data);
            setUsernameTaken(false);
        } catch (error) {
            console.log('Registration failed:', error.message);
            if (error.message.includes('400')) {
                setUsernameTaken(true);
            }
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleUserRegister} className="signup-form">
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {usernameTaken && <p className="error">Username is already taken</p>}
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="#" onClick={switchToSignIn}>Sign In</Link></p>
        </div>
    );
}

export default SignUp;