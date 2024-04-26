import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setShowPopup, handleLogout }) {
    const navigate = useNavigate();

    const handleUserLogout = (event) => {
        event.preventDefault();
        handleLogout();
        setShowPopup(false);
        navigate('/');
    };

    return (
        <div className="logout-box">
            <button onClick={handleUserLogout}>Logout</button>
        </div>
    );
}

export default Logout;