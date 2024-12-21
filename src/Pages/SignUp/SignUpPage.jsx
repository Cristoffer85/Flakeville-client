import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { registerUser } from '../../Api/AuthApi/AuthApi';
import { navigateBasedOnRole } from '../../Components/Router/Router.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpPage.css';

function SignUpPage({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const navigate = useNavigate();

    const handleUserRegister = async (event) => {
        event.preventDefault();

        try {
            const data = await registerUser(username, password);
            Cookies.set('token', data.jwt);
            handleLogin(data.user.username, data.jwt, data.role.authority);

            // Navigate to the respective page based on the user's role
            navigateBasedOnRole(data.role.authority, navigate);
        } catch (error) {
            console.log('Registration failed:', error.message);
            if (error.message.includes('already exists')) {
                setUsernameTaken(true);
                toast.error(`Username '${username}' already exists. Please choose a different username.`);
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
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                {usernameTaken && <p className="error">Username taken</p>}
                <button type="submit">Register</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SignUpPage;