import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/authapi/authapi.jsx';
import { navigateBasedOnRole } from '../../components/ROUTER2/ROUTER2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUserLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await loginUser(username, password);
            if (data && data.token) {
                login(data.token);

                // Navigate to the respective page based on the user's role
                navigateBasedOnRole(data.role.authority, navigate);
            } else {
                console.error('Invalid login response:', data);
            }
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