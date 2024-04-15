import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Account from './Account'; // import the Account component
import './Navbar.css'; // import the CSS file
import logo from '/Logo.jpg'; // replace with the path to your logo image

function Navbar({ isLoggedIn, handleLogin }) {
    const [showPopup, setShowPopup] = useState(false); // add this line

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <ul>
                    <div> {/* add this line */}
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/store">Store</Link></li>
                        <li><Link to="/weather">Weather</Link></li>
                    </div> {/* add this line */}
                    <div> {/* add this line */}
                        <li><a onClick={() => setShowPopup(prev => !prev)}>Account</a></li> {/* modify this line */}
                    </div> {/* add this line */}
                </ul>
            </div>
            {showPopup && <Account setShowPopup={setShowPopup} handleLogin={handleLogin} />} {/* add this line */}
        </nav>
    );
}

export default Navbar;