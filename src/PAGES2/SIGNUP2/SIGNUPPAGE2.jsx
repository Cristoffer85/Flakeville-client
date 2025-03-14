import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { registerUser } from '../../API2/AUTHAPI2/AUTHAPI2.jsx';
import { navigateBasedOnRole } from '../../COMPONENTS2/ROUTER2/ROUTER2.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <form onSubmit={handleUserRegister}>
                    <Link to="/signin" className="btn btn-link p-0 mb-3">← Sign In</Link>
                    <h3 className="mb-3">Sign Up</h3>
                    <div className="mb-3">
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="form-control" style={{ backgroundColor: 'lightgray' }} />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="form-control" style={{ backgroundColor: 'lightgray' }} />
                    </div>
                    {usernameTaken && <p className="text-danger">Username taken</p>}
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;