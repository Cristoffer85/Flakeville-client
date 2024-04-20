import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthHandler from './AuthHandler.jsx';
import SnowfallEffect from './SnowfallEffect.jsx';
import './CSS/Navbar.css';
import logo from '../assets/Logo.png';
import accountLogo from '../assets/ProfileLogoGold.png';
import snowflakeImg from '../assets/Snowflake.png'; // Import the Snowflake.png image

function Navbar({ isLoggedIn, handleLogin, handleLogout }) {
    const [showPopup, setShowPopup] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formType, setFormType] = useState('Account');
    const [isSnowing, setIsSnowing] = useState(false);
    const [snowKey, setSnowKey] = useState(0);

    const handleSignInClick = () => {
        setShowPopup(true);
        setShowRegisterForm(false);
        setFormType('Sign In');
    };

    const handleSignUpClick = () => {
        setShowPopup(true);
        setShowRegisterForm(true);
        setFormType('Sign Up');
    };

    const handleAccountClick = () => {
        if (!isLoggedIn) {
            setShowButtons(!showButtons);
        } else {
            setShowPopup(!showPopup);
            setFormType('Logout');
        }
    };

    const handleStartSnow = () => {
        setIsSnowing(true);
        setSnowKey(prevKey => prevKey + 1);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Logo" className="main-logo" />
                <ul>
                    <div>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/store">STORE</Link></li>
                        <li><Link to="/weather">WEATHER</Link></li>
                    </div>
                    <div>
                        {!isLoggedIn && showButtons && (
                            <>
                                <button onClick={handleSignInClick}>Sign In</button>
                                <button onClick={handleSignUpClick} className="signup-button">Sign Up</button>
                            </>
                        )}
                        <img src={snowflakeImg} alt="Start snow" onClick={handleStartSnow} className="snowflake-button" /> {/* Use the Snowflake.png image as the button */}
                        <img src={accountLogo} alt="AuthHandler" onClick={handleAccountClick} className="account-logo" />
                    </div>
                </ul>
            </div>
            {showPopup && <AuthHandler isLoggedIn={isLoggedIn} setShowPopup={setShowPopup} handleLogin={handleLogin} handleLogout={handleLogout} showRegisterForm={showRegisterForm} formType={formType} />}
            <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
        </nav>
    );
}

export default Navbar;
