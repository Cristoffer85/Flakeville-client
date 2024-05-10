import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Store from '../pages/Store.jsx';
import Weather from '../pages/Weather.jsx';
import AdminAcc from "../pages/AdminAccount.jsx";
import EmployeeAcc from "../pages/EmployeeAccount.jsx";
import UserAcc from "../pages/UserAccount.jsx";
import Navbar from './Navbar';
import Cart from "../pages/Cart.jsx";
import HOC from "./HOC.jsx";

export const navigateBasedOnRole = (role, username, navigate) => {
    console.log('Navigating based on role:', role); // Add this line
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

function AppRouter({ isLoggedIn, handleLogin, handleLogout, username, role, showPopup, setShowPopup, setPageTitle }) {
    const commonProps = { isLoggedIn, handleLogin, handleLogout, username, role, showPopup, setShowPopup };


    return (
        <Router>
            <PageTitleUpdater setPageTitle={setPageTitle} />
            <div>
                <Navbar {...commonProps} />
                <Routes>
                    <Route path="/store" element={<Store {...commonProps} />} />
                    <Route path="/weather" element={<Weather {...commonProps} />} />
                    <Route path="/" element={<Home {...commonProps} />} />
                    <Route path="/admin" element={<HOC><AdminAcc {...commonProps} /></HOC>} />
                    <Route path="/employee" element={<HOC><EmployeeAcc {...commonProps} /></HOC>} />
                    <Route path="/user" element={<HOC><UserAcc {...commonProps} /></HOC>} />
                    <Route path="/cart" element={<Cart {...commonProps} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;