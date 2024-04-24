import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import AuthHandler from './AuthHandler.jsx';
import Store from '../pages/Store.jsx';
import Weather from '../pages/Weather.jsx';
import AdminAcc from "../pages/AdminAccount.jsx";
import EmployeeAcc from "../pages/EmployeeAccount.jsx";
import UserAcc from "../pages/UserAccount.jsx";
import Navbar from './Navbar';
import Cart from "../pages/Cart.jsx";

export const navigateBasedOnRole = (role, username, navigate) => {
    if (role === 'ADMIN') {
        navigate('/admin');
    } else if (role === 'EMPLOYEE') {
        navigate('/employee');
    } else if (role === 'USER') {
        navigate(`/user`);
    }
}

function PageTitleUpdater({ setPageTitle }) {
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        let pageTitle;
        switch (currentPath) {
            case '/store':
                pageTitle = 'SNÖFJÄLLBY STORE';
                break;
            case '/weather':
                pageTitle = 'SNÖFJÄLLBY WEATHER';
                break;
            case '/admin':
                pageTitle = 'ADMIN ACCOUNT';
                break;
            case '/employee':
                pageTitle = 'EMPLOYEE ACCOUNT';
                break;
            case '/user':
                pageTitle = 'USER ACCOUNT';
                break;
            case '/cart':
                pageTitle = 'SHOPPING CART';
                break;
            default:
                pageTitle = 'SNÖFJÄLLBY HOME';
        }
        setPageTitle(pageTitle);
    }, [location, setPageTitle]);

    return null;
}

function AppRouter({ isLoggedIn, handleLogin, handleLogout, username, showPopup, setShowPopup, setPageTitle }) {
    const commonProps = { isLoggedIn, handleLogin, handleLogout, username, showPopup, setShowPopup };

    return (
        <Router>
            <PageTitleUpdater setPageTitle={setPageTitle} />
            <div>
                <Navbar {...commonProps} />
                <Routes>
                    <Route path="/account" element={<AuthHandler {...commonProps} />} />
                    <Route path="/store" element={<Store {...commonProps} />} />
                    <Route path="/weather" element={<Weather {...commonProps} />} />
                    <Route path="/" element={<Home {...commonProps} />} />
                    <Route path="/admin" element={<AdminAcc {...commonProps} />} />
                    <Route path="/employee" element={<EmployeeAcc {...commonProps} />} />
                    <Route path="/user" element={<UserAcc {...commonProps} />} />
                    <Route path="/cart" element={<Cart {...commonProps} />} /> {/* Remove the cart prop */}
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;