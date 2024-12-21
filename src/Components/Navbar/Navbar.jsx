import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import '../Navbar/Navbar.css';
import logo from '../../Assets/Logo.png';
import accountLogo from '../../Assets/ProfileLogoGold.png';
import snowflakeImg from '../../Assets/Snowflake.png';
import shoppingCartLogo from '../../Assets/Shoppingcartlogo.png';
import weatherIcon from '../../Assets/cloudy.png';
import storeIcon from '../../Assets/store.png';

import PageTitleContext from '../../Contexts/PageTitleContext/PageTitleContext.jsx';
import CartContext from '../../Contexts/CartContext/CartContext.jsx';
import LiftsContext from '../../Contexts/LiftsContext/LiftsContext.jsx';

import { navigateBasedOnRole } from "../Router/Router.jsx";
import { fetchLifts } from '../../Api/EmployeeApi/EmployeeApi';
import SnowfallEffect from '../SnowfallEffect/SnowfallEffect.jsx';

function Navbar({ isLoggedIn, handleLogin, handleLogout }) {
    const { cart } = useContext(CartContext);
    const pageTitle = useContext(PageTitleContext);
    const [isSnowing, setIsSnowing] = useState(false);
    const [snowKey, setSnowKey] = useState(0);
    const navigate = useNavigate();
    const { lifts, setLifts } = useContext(LiftsContext);

    // Counter logic for the shopping cart, also present down in the return statement
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

    useEffect(() => {
        const fetchLiftsData = async () => {
            try {
                const data = await fetchLifts();
                if (Array.isArray(data)) {
                    setLifts(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Failed to fetch lifts:', error);
            }
        };

        fetchLiftsData();
    }, []);

    const handleSignInClick = () => {
        navigate('/signin');
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleSignOutClick = () => {
        handleLogout();
        setTimeout(() => {
            navigate('/');
        }, 5); // Add a small delay to ensure state updates
    };

    const handleAccountClick = () => {
        if (isLoggedIn) {
            const role = Cookies.get('role');
            navigateBasedOnRole(role, navigate);
        }
    };

    const handleStartSnow = () => {
        setIsSnowing(true);
        setSnowKey(prevKey => prevKey + 1);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/">
                    <img src={logo} alt="Logo" className="main-logo" title="Flakeville home" />
                </Link>
                <ul>
                    <div>
                        <li>
                            <Link to="/weather">
                                <img className="nav-icon" src={weatherIcon} alt="Weather Icon" />
                                <span className="nav-text">POWDERTRACKER</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/store">
                                <img className="nav-icon" src={storeIcon} alt="Store Icon" />
                                <span className="nav-text">STORE</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <img src={shoppingCartLogo} alt="Shopping Cart" className="shopping-cart-logo" />
                                {totalItems > 0 && (
                                    <div className="cart-count">
                                        {totalItems}
                                    </div>
                                )}
                            </Link>
                        </li>
                        <h1 className="navbar-title">{pageTitle}</h1>
                        <div className="lift-status-container">
                            {lifts.map(lift => (
                                <div key={lift.id} className="lift-status">
                                    <p>Lift {lift.id}:</p>
                                    <div className={`status-light ${lift.operating ? 'green' : 'red'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {!isLoggedIn && (
                            <>
                                <button onClick={handleSignInClick} className="signin-button">Sign In</button>
                                <button onClick={handleSignUpClick} className="signup-button">Sign Up</button>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <button onClick={handleSignOutClick} className="signout-button">Sign Out</button>
                                <img src={accountLogo} onClick={handleAccountClick} className="account-logo" />
                            </>
                        )}
                        <img src={snowflakeImg} onClick={handleStartSnow} className="snowflake-button" title="Click me for some magic!" />
                    </div>
                </ul>
            </div>
            <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
        </nav>
    );
}

export default Navbar;