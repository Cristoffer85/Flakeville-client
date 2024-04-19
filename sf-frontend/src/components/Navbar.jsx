import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Account from './Account';
import './CSS/Navbar.css';
import logo from '../assets/Logo.jpg';
import accountLogo from '../assets/ProfileLogoGold.png';
import {navigateBasedOnRole} from "./Router.jsx";
import Cookies from "js-cookie";

function Navbar({ isLoggedIn, handleLogin, handleLogout, showPopup, setShowPopup }) {
    const navigate = useNavigate();
    const username = Cookies.get('username');
    const role = Cookies.get('role');
    const [showInitialPopup, setShowInitialPopup] = useState(false);

    useEffect(() => {
    }, [role]);

    const handleAccountClick = () => {
        if (!isLoggedIn) {
            setShowInitialPopup(true);
        } else {
            setShowPopup(true);
            if (navigate) {
                navigateBasedOnRole(role, username, navigate);
            }
        }
    };

    const handleSignInClick = () => {
        setShowInitialPopup(false);
        setShowPopup(true);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <ul>
                    <div>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/store">Store</Link></li>
                        <li><Link to="/weather">Weather</Link></li>
                    </div>
                    <div>
                        <li><img src={accountLogo} alt="Account" onClick={handleAccountClick} /></li>
                    </div>
                </ul>
            </div>
            {showInitialPopup && (
                <div className="initialPopup">
                    <button onClick={handleSignInClick}>Sign in</button>
                    <button>Sign up</button>
                </div>
            )}
            {showPopup && <Account isLoggedIn={isLoggedIn} setShowPopup={setShowPopup} handleLogin={handleLogin} handleLogout={handleLogout} />}
        </nav>
    );
}

export default Navbar;