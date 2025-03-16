import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/mainlogo.png';
import accountLogo from '../../../assets/accountlogo.png';
import snowflakeImg from '../../../assets/snowflakelogo.png';
import shoppingCartLogo from '../../../assets/shoppingcartlogo.png';
import chatLogo from '../../../assets/chatlogo.png';

import SnowfallEffect from '../../snowfalleffect/snowfalleffect.jsx';
import useNavbarLogic from '../../../hooks/usenavbarlogic.jsx';

function NavbarRegular({ handleLogout }) {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    totalItems,
    pageTitle,
    isSnowing,
    snowKey,
    unreadMessages,
    handleAccountClick,
    handleStartSnow,
  } = useNavbarLogic(handleLogout);

  const handleAccountLogoClick = () => {
    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      handleAccountClick();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-dark"
      style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.0))' }}
    >
      <div className="container-fluid position-relative">
        {/* LEFT Icons + Links */}
        <div className="collapse navbar-collapse show">
            {/* Main Logo */}
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: '3.5rem', height: '3.5rem', marginRight: '-0.8rem' }}
                title="Flakeville home"
              />
            </Link>
            <ul
              className="navbar-nav me-auto mb-2 mb-md-0 align-items-center"
              style={{ fontSize: '1.3rem', fontWeight: '600' }}
            >
              {/* Weather */}
              <li className="nav-item" style={{ marginRight: '-0.5rem' }}>
                <Link className="nav-link" to="/weather" style={{ color: 'white' }}>
                  WEATHER
                </Link>
              </li>
              {/* Store */}
              <li className="nav-item" style={{ marginRight: '-0.5rem' }}>
                <Link className="nav-link" to="/store" style={{ color: 'white' }}>
                  STORE
                </Link>
              </li>
              {/* Shopping Cart */}
              <li className="nav-item position-relative" style={{ marginRight: '-0.5rem' }}>
                <Link className="nav-link" to="/cart">
                  <img
                    src={shoppingCartLogo}
                    alt="Shopping Cart"
                    style={{ width: '2.2rem', height: '2.2rem' }}
                  />
                  {totalItems > 0 && (
                    <span className="badge bg-danger" style={{ fontSize: '0.8rem' }}>
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>

          {/* CENTER - Page Title */}
          <span
            className="navbar-text d-none d-lg-block text-danger h4 mb-0 position-absolute top-50 start-50 translate-middle"
            style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
          >
            {pageTitle}
          </span>

          {/* RIGHT - Icons + Links */}
          <ul className="navbar-nav align-items-center">
            {/* Chat & Account & Sign out icons and buttons - only show when logged in */}
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/chat">
                    <img
                      src={chatLogo}
                      alt="Chat"
                      style={{ width: '2.2rem', height: '2.2rem' }}
                    />
                    {unreadMessages > 0 && (
                      <span className="badge bg-danger" style={{ fontSize: '0.7rem' }}>
                        !
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <img
                    src={accountLogo}
                    alt="Account"
                    onClick={handleAccountLogoClick}
                    style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}
                    className="nav-link"
                  />
                </li>
              </>
            ) : (
              <li className="nav-item">
                <img
                  src={accountLogo}
                  alt="Account"
                  onClick={handleAccountLogoClick}
                  style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}
                  className="nav-link"
                />
              </li>
            )}
            {/* Snowfall effect  - always show */}
            <li className="nav-item">
              <img
                src={snowflakeImg}
                alt="Snowfall effect"
                onClick={handleStartSnow}
                style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}
                className="nav-link"
                title="Click me for some magic!"
              />
            </li>
          </ul>
        </div>
      </div>
      <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
    </nav>
  );
}

export default NavbarRegular;