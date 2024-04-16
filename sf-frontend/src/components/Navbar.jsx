import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Account from './Account';
import UserContext from './UserContext';
import RoleContext from './RoleContext';
import './Navbar.css';
import logo from '/Logo.jpg';
import accountLogo from '/ProfileLogoGold.png';

function Navbar({ isLoggedIn, handleLogin, handleLogout, showPopup, setShowPopup }) {
    const username = useContext(UserContext);
    const role = useContext(RoleContext);
    const navigate = useNavigate();

    useEffect(() => {
    }, [role]);

    const handleAccountClick = () => {
        setShowPopup(true);

        if (role === 'ADMIN') {
            navigate('/admin');
        } else if (role === 'EMPLOYEE') {
            navigate('/employee');
        } else if (role === 'USER') {
            navigate(`/user/${username}`);
        } else {
            console.log('Unknown role:', role);
        }
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
            {showPopup && <Account isLoggedIn={isLoggedIn} setShowPopup={setShowPopup} handleLogin={handleLogin} handleLogout={handleLogout} />}
        </nav>
    );
}

export default Navbar;