import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginUser } from '../../Api/AuthApi/AuthApi';
import { navigateBasedOnRole } from '../../Components/Router/Router.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoleContext from '../../Contexts/RoleContext/RoleContext.jsx';

function SignInPage({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setRole } = useContext(RoleContext); // Use RoleContext

    const handleUserLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await loginUser(username, password);
            Cookies.set('token', data.jwt);
            handleLogin(data.user.username, data.jwt, data.role.authority);

            // Set the role in RoleContext
            setRole(data.role.authority);

            // Navigate to the respective page based on the user's role
            navigateBasedOnRole(data.role.authority, navigate);
        } catch (error) {
            console.log('Login failed:', error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <form onSubmit={handleUserLogin}>
                    <h3 className="mb-3">Sign In</h3>
                    <div className="mb-3">
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <div className="mt-3 text-center">
                        <span className="register-text">Not a user yet? Register </span>
                        <Link to="/signup" className="btn btn-link p-0" style={{ verticalAlign: 'baseline' }}>here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;