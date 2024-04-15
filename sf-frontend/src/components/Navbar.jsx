import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account';
import './Navbar.css';
import logo from '/Logo.jpg';
import accountLogo from '/ProfileLogoGold.png';

function Navbar({ isLoggedIn, handleLogin, handleLogout, showPopup, setShowPopup }) {

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
                        <li><img src={accountLogo} alt="Account" onClick={() => setShowPopup(prev => !prev)} /></li> {}
                    </div>
                </ul>
            </div>
            {showPopup && <Account isLoggedIn={isLoggedIn} setShowPopup={setShowPopup} handleLogin={handleLogin} handleLogout={handleLogout} />} {}
        </nav>
    );
}

export default Navbar;