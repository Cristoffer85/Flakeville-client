import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser, checkUsername } from '../../Api/AuthApi/AuthApi';
import './SignUp.css';

function SignUp({ switchToSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);

    const handleUserRegister = async (event) => {
        event.preventDefault();

        try {
            const data = await registerUser(username, password);
            console.log('Registration successful:', data);
            setIsRegistered(true);
            setUsernameTaken(false);
        } catch (error) {
            console.log('Registration failed:', error.message);
            if (error.message.includes('401')) {
                setUsernameTaken(true);
            }
        }
    };

    const handleCheckUsername = async () => {
        try {
            const isTaken = await checkUsername(username);
            setUsernameTaken(isTaken);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="signUp-box">
            {!isRegistered ? (
                <form onSubmit={handleUserRegister}>
                    <h3>Sign Up</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onBlur={handleCheckUsername}
                        placeholder="Username"
                        required
                    />
                    {usernameTaken && <p>Username is already taken</p>}
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Register</button>
                    {isRegistered && <p>Registration successful! <Link to="#" onClick={switchToSignIn}>Sign In</Link></p>}
                </form>
            ) : (
                <p>Registration successful! <Link to="#" onClick={switchToSignIn}>Sign In</Link></p>
            )}
        </div>
    );
}

export default SignUp;