import React, {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SnowfallEffect from './SnowfallEffect.jsx';
import './css/Navbar.css';
import logo from '../assets/Logo.png';
import accountLogo from '../assets/ProfileLogoGold.png';
import snowflakeImg from '../assets/Snowflake.png';
import shoppingCartLogo from '../assets/Shoppingcartlogo.png';
import weatherIcon from '../assets/cloudy.png';
import storeIcon from '../assets/store.png';
import PageTitleContext from './PageTitleContext.jsx';
import CartContext from "./CartContext.jsx";
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import {navigateBasedOnRole} from "./Router.jsx";
import Cookies from "js-cookie";
import SignOut from "./SignOut.jsx";
import LiftsContext from './LiftsContext.jsx';

function Navbar({ isLoggedIn, handleLogin, handleLogout}) {
    const { cart } = useContext(CartContext);
    const pageTitle = useContext(PageTitleContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [formType, setFormType] = useState('Account');
    const [isSnowing, setIsSnowing] = useState(false);
    const [snowKey, setSnowKey] = useState(0);
    const popupRef = React.createRef();
    const navigate = useNavigate();
    const { lifts, setLifts } = useContext(LiftsContext);

    // Counter logic for the shopping cart, also present down in the return statement
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }


        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [popupRef]);
    useEffect(() => {
        fetchLifts();
    }, []);

    const handleSignInClick = () => {
        setShowPopup(true);
        setFormType('SignIn');
    };
    const handleSignUpClick = () => {
        setShowPopup(true);
        setFormType('SignUp');
    };
    const handleSignOutClick = () => {
        setShowPopup(true);
        setFormType('SignOut');
    };

    const switchToSignIn = () => {
        setShowPopup(true);
        setFormType('SignIn');
    };

    const handleAccountClick = () => {
        if (!isLoggedIn) {
            setShowButtons(!showButtons);
        } else {
            const role = Cookies.get('role');
            const username = Cookies.get('username');
            navigateBasedOnRole(role, username, navigate);
        }
    };
    const handleStartSnow = () => {
        setIsSnowing(true);
        setSnowKey(prevKey => prevKey + 1);
    };
    const fetchLifts = async () => {
        const response = await fetch('https://flakeville-server.onrender.com/skilifts/getAllLifts');
        const data = await response.json();
        if (Array.isArray(data)) {
            setLifts(data);
        } else {
            console.error('Data is not an array:', data);
        }
        setLifts(data);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/">
                    <img src={logo} alt="Logo" className="main-logo"
                    title="Flakeville home"/>
                </Link>
                <ul>
                    <div>
                        <li>
                            <Link to="/weather">
                                <img className="nav-icon" src={weatherIcon} alt="Weather Icon"/>
                                <span className="nav-text">POWDERTRACKER</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/store">
                                <img className="nav-icon" src={storeIcon} alt="Store Icon"/>
                                <span className="nav-text">STORE</span>
                            </Link>
                        </li>
                        <li><Link to="/cart">
                            <img src={shoppingCartLogo} alt="Shopping Cart" className="shopping-cart-logo"/>
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
                        {!isLoggedIn && showButtons && (
                            <>
                                <button onClick={handleSignInClick} className="signin-button">Sign In</button>
                                <button onClick={handleSignUpClick} className="signup-button">Sign Up</button>
                            </>
                        )}
                        {isLoggedIn && (
                            <button onClick={handleSignOutClick} className="signout-button">Sign Out</button>
                        )}
                        <img src={snowflakeImg} onClick={handleStartSnow} className="snowflake-button"
                             title="Click me for some magic!"/>
                        <img src={accountLogo} onClick={handleAccountClick} className="account-logo"/>
                    </div>
                </ul>
            </div>
            {showPopup && (
                <div className="login-and-SignInPopup" ref={popupRef}>
                {formType === 'SignIn' && <SignIn setShowPopup={setShowPopup} handleLogin={handleLogin} />}
                    {formType === 'SignUp' && <SignUp setShowPopup={setShowPopup} handleLogin={handleLogin} switchToSignIn={switchToSignIn} />}
                    {showPopup && formType === 'SignOut' && <SignOut setShowPopup={setShowPopup} handleLogout={handleLogout} />}
                </div>
            )}
            <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
        </nav>
    );
}

export default Navbar;
