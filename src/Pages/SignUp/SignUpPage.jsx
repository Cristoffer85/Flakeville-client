import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { registerUser } from '../../Api/AuthApi/AuthApi';
import { navigateBasedOnRole } from '../../Components/Router/Router.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpPage.css';

function SignUpPage({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const navigate = useNavigate();

    const handleUserRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const data = await registerUser(username, password);
            console.log('Registration successful:', data);
            Cookies.set('token', data.jwt);
            handleLogin(data.username, data.jwt, data.role);

            toast.success("User successfully registered!");

            console.log('Navigating based on role:', data.role);
            navigateBasedOnRole(data.role, navigate);
        } catch (error) {
            console.log('Registration failed:', error.message);
            if (error.message.includes('already exists')) {
                setUsernameTaken(true);
                toast.error(`"${username}" already exists. Please choose a different username.`);
            } else {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="signUpPage">
            <form onSubmit={handleUserRegister}>
                <Link to="/signin" className="back-to-signin">← Sign In</Link>
                <h3>Sign Up</h3>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="username-input" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="password-input" />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="password-input" />
                {usernameTaken && <p className="error">Username taken</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUpPage;