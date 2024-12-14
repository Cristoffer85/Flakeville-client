import React from 'react';
import {useNavigate} from "react-router-dom";
import './SignOut.css';

function SignOut({ setShowPopup, handleLogout }) {
    const navigate = useNavigate();
    const handleYesClick = () => {
        handleLogout();
        navigate('/');
        setShowPopup(false);
    };

    const handleNoClick = () => {
        setShowPopup(false);
    };

    return (
        <div className="signout-box">
            <p>Are you sure you want to Sign out?</p>
            <button className="yes-button" onClick={handleYesClick}>Yes</button>
            <button className="no-button" onClick={handleNoClick}>No</button>
        </div>
    );
}

export default SignOut;