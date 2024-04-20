import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthHandler from './AuthHandler.jsx';
import SnowfallEffect from './SnowfallEffect.jsx';
import './CSS/Navbar.css';
import logo from '../assets/Logo.png';
import accountLogo from '../assets/ProfileLogoGold.png';

function Navbar({ isLoggedIn, handleLogin, handleLogout }) {
    const [showPopup, setShowPopup] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formType, setFormType] = useState('Account');
    const [isSnowing, setIsSnowing] = useState(false); // State to track if snowfall effect is active
    const [snowKey, setSnowKey] = useState(0); // Key for forcing re-render of SnowfallEffect component

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
        setIsSnowing(true); // Set snowing to true to start the snowfall effect
        setSnowKey(prevKey => prevKey + 1); // Update the key to force re-render of SnowfallEffect component
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
                                <button onClick={handleSignUpClick}>Sign Up</button>
                            </>
                        )}
                        <button onClick={handleStartSnow}>Start the snow</button> {/* Button to start the snowfall effect */}
                        <img src={accountLogo} alt="AuthHandler" onClick={handleAccountClick} className="account-logo" />
                    </div>
                </ul>
            </div>
            {showPopup && <AuthHandler isLoggedIn={isLoggedIn} setShowPopup={setShowPopup} handleLogin={handleLogin} handleLogout={handleLogout} showRegisterForm={showRegisterForm} formType={formType} />}
            <SnowfallEffect key={snowKey} isSnowing={isSnowing} /> {/* Pass the key prop to force re-render of SnowfallEffect */}
        </nav>
    );
}

export default Navbar;
