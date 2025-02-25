import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../Assets/Logo.png';
import accountLogo from '../../Assets/ProfileLogoGold.png';
import snowflakeImg from '../../Assets/Snowflake.png';
import shoppingCartLogo from '../../Assets/Shoppingcartlogo.png';
import menuOpenIcon from '../../Assets/menu_open.svg';
import menuCloseIcon from '../../Assets/menu_close.svg';

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
    const [menuOpen, setMenuOpen] = useState(false);
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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
          <div className="container-fluid position-relative">
            
    {/* ############### NOT COLLAPSIBLE CONTENT - 768px AND UP ###############*/}
            {/* Left side: Brand (Logo) */}
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: '3.5rem', height: '3.5rem' }}
                title="Flakeville home"
              />
            </Link>

    {/* ############### MENU TOGGLE BUTTON - 768px AND UP ###############*/}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <img
                src={menuOpen ? menuCloseIcon : menuOpenIcon}
                alt="Menu Toggle"
                style={{ width: '2.5rem', height: '2.5rem' }}
              />
            </button>

    {/* ############### COLLAPSIBLE CONTENT - UP TO 768px ###############*/}
            <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
              {/* Left Links */}
              <ul className="navbar-nav me-auto mb-2 mb-md-0 align-items-center" style={{ fontSize: '1.3rem', fontWeight: '600' }}>
                <li className="nav-item">
                  <Link className="nav-link" to="/weather">
                    POWDERTRACKER
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/store">
                    STORE
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    <img
                      src={shoppingCartLogo}
                      alt="Shopping Cart"
                      style={{ width: '3rem', height: '3rem' }}
                    />
                    {totalItems > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>

              {/* Center Title */}
            <span className="navbar-text text-danger h4 mb-0 position-absolute top-50 start-50 translate-middle" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
              {pageTitle}
            </span>
    
              {/* Right Icons/Actions */}
              <ul className="navbar-nav align-items-center">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <button onClick={handleSignOutClick} className="btn btn-link nav-link">
                        Sign Out
                      </button>
                    </li>
                    <li className="nav-item">
                      <img
                        src={accountLogo}
                        alt="Account"
                        onClick={handleAccountClick}
                        style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}
                        className="nav-link"
                      />
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button onClick={handleSignInClick} className="btn btn-link nav-link">
                      Sign In
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <img
                    src={snowflakeImg}
                    alt="Snowfall effect"
                    onClick={handleStartSnow}
                    style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}
                    title="Click me for some magic!"
                    className="nav-link"
                  />
                </li>
              </ul>
            </div>
          </div>
    
          <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
        </nav>
      );
    };
    
    export default Navbar;