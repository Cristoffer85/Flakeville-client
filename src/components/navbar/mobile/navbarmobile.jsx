import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/mainlogo.png';
import accountLogo from '../../../assets/accountlogo.png';
import snowflakeImg from '../../../assets/snowflakelogo.png';
import shoppingCartLogo from '../../../assets/shoppingcartlogo.png';
import chatLogo from '../../../assets/chatlogo.png';
import menuOpenIcon from '../../../assets/menu_open.svg';
import menuCloseIcon from '../../../assets/menu_close.svg';

import SnowfallEffect from '../../snowfalleffect/snowfalleffect.jsx';
import useNavbarLogic from '../../../hooks/usenavbarlogic.jsx';

function NavbarMobile({ handleLogout }) {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    totalItems,
    isSnowing,
    snowKey,
    unreadMessages,
    handleAccountClick,
    handleStartSnow,
  } = useNavbarLogic(handleLogout);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleAccountLogoClick = () => {
    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      handleAccountClick();
    }
  };

  return (
    <nav className={`navbar navbar-expand-md fixed-top navbar-dark bg-dark ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo - Always show */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '3.5rem', height: '3.5rem' }}
            title="Flakeville home"
          />
        </Link>

        <div className="d-flex align-items-center">
          {/* Chat icon - only show when logged in */}
          {isLoggedIn && (
            <Link className="nav-link" to="/chat" style={{ marginRight: '0.8rem' }}>
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
          )}

          {/* Account logo - Always show */}
          <img
            src={accountLogo}
            alt="Account"
            onClick={handleAccountLogoClick}
            style={{ width: '3rem', height: '3rem', cursor: 'pointer', marginRight: '0.8rem' }}
            className="nav-link"
          />

          {/* Menu toggler - Always show */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <img
              src={menuOpen ? menuCloseIcon : menuOpenIcon}
              alt="Toggle menu"
              style={{ width: '2.2rem', height: '2.2rem' }}
            />
          </button>
        </div>
      </div>

      <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
        <ul
          className="navbar-nav"
          style={{ fontSize: '1.3rem', fontWeight: '600', marginLeft: '1rem' }}
        >
          {/* Weather */}
          <li className="nav-item" style={{ marginRight: '-0.5rem' }}>
            <Link className="nav-link" to="/weather">
              WEATHER
            </Link>
          </li>
          {/* Store */}
          <li className="nav-item" style={{ marginRight: '-0.5rem' }}>
            <Link className="nav-link" to="/store">
              STORE
            </Link>
          </li>
          {/* Shopping Cart */}
          <li className="nav-item position-relative" style={{ marginRight: '-0.5rem' }}>
            <Link className="nav-link" to="/cart">
              SHOPPINGCART&nbsp;
              <img
                src={shoppingCartLogo}
                alt="Shopping Cart"
                style={{ width: '2rem', height: '2rem' }}
              />
              {totalItems > 0 && (
                <span className="badge bg-danger" style={{ fontSize: '0.8rem' }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          {/* Snowfall effect */}
          <li className="nav-item d-flex align-items-center" style={{ marginRight: '-0.5rem' }}>
            <div
              className="nav-link d-flex align-items-center"
              onClick={handleStartSnow}
              style={{ cursor: 'pointer' }}
            >
              <span style={{ marginRight: '0.5rem' }}>SNOWFALL EFFECT</span>
              <img
                src={snowflakeImg}
                alt="Snowfall effect"
                style={{ width: '2rem', height: '2rem' }}
              />
            </div>
          </li>
        </ul>
      </div>

      <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
    </nav>
  );
}

export default NavbarMobile;