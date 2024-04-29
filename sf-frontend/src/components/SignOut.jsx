import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignOut.css';

function SignOut({ setShowPopup, handleLogout }) {
    const navigate = useNavigate();

    const handleUserLogout = (event) => {
        event.preventDefault();
        handleLogout();
        setShowPopup(false);
        navigate('/');
    };

    return (
        <div className="logout-box">
            <h3>Sign Out</h3>
            <button onClick={handleUserLogout}>Sign out</button>
        </div>
    );
}

export default SignOut;