import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // import the CSS file
import logo from '/Logo.jpg'; // replace with the path to your logo image

function Navbar() {
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
                        <li><Link to="/account">Account</Link></li>
                    </div> {/* add this line */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;