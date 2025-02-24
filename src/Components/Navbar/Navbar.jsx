import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../Navbar/Navbar.scss';
import logo from '../../Assets/Logo.png';
import accountLogo from '../../Assets/ProfileLogoGold.png';
import snowflakeImg from '../../Assets/Snowflake.png';
import shoppingCartLogo from '../../Assets/Shoppingcartlogo.png';
import weatherIcon from '../../Assets/cloudy.png';
import storeIcon from '../../Assets/store.png';

import PageTitleContext from '../../Contexts/PageTitleContext/PageTitleContext.jsx';
import CartContext from '../../Contexts/CartContext/CartContext.jsx';
import LiftsContext from '../../Contexts/LiftsContext/LiftsContext.jsx';

import { navigateBasedOnRole } from '../Router/Router.jsx';
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

    const handleSignOutClick = () => {
        handleLogout();
        toast.success('Successfully logged out.');
        setTimeout(() => {
            navigate('/');
        }, 5); // Add a small delay to ensure state updates (This is important for the navbar to update correctly right now, dont remove it)
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

                {/* ------------- navbar-left -------------*/}
                <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="main-logo" title="Flakeville home" />
                </Link>

                    {/* ------------- navbar-left-links -------------*/}
                    <ul className="navbar-left-links">
                        <li>
                        <Link to="/weather">
                            <span className="weather-text">POWDERTRACKER</span>
                        </Link>
                        </li>
                        <li>
                        <Link to="/store">
                            <span className="store-text">STORE</span>
                        </Link>
                        </li>
                        <li>
                        <Link to="/cart">
                            <img src={shoppingCartLogo} alt="Shopping Cart" className="shoppingcart-logo" />
                            {totalItems > 0 && (
                            <div className="cart-count">{totalItems}</div>
                            )}
                        </Link>
                        </li>
                    </ul>
                    </div>

                {/* ------------- navbar-center -------------*/}
                <div className="navbar-center">

                    {/* Page title from context == Meaning altering this navbar-title here in navbar.scss alters the title style for all pages */}
                    <h1 className="navbar-title">{pageTitle}</h1>

                    {/* ------------- lift-status-container -------------*/}
                    <div className="lift-status-container">
                        {lifts.map(lift => (
                        <div key={lift.id} className="lift-status">
                            <p>Lift {lift.id}:</p>
                            <div className={`status-light ${lift.operating ? 'green' : 'red'}`}></div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* ------------- navbar-right -------------*/}
                <div className="navbar-right">
                {!isLoggedIn ? (
                    <button onClick={handleSignInClick} className="signin-button">Sign In</button>
                ) : (
                    <>
                    <button onClick={handleSignOutClick} className="signout-button">Sign Out</button>
                    <img src={accountLogo} onClick={handleAccountClick} className="account-logo" />
                    </>
                )}
                <img src={snowflakeImg} onClick={handleStartSnow} className="snowfall-logo" title="Click me for some magic!" />
                </div>

            </div>
        <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
        </nav>
    );
}

export default Navbar;