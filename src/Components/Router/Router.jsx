import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HOC from "../../Components/HOC/HOC.jsx";

import Navbar from "../../Components/Navbar/Navbar.jsx";
import Home from '../../Pages/Home/Home.jsx';
import AdminAcc from "../../Pages/AdminAccount/AdminAccount.jsx";
import EmployeeAcc from "../../Pages/EmployeeAccount/EmployeeAccount.jsx";
import UserAcc from "../../Pages/UserAccount/UserAccount.jsx";
import Store from '../../Pages/Store/Store.jsx';
import Cart from "../../Pages/Cart/Cart.jsx";
import Weather from '../../Pages/Weather/Weather.jsx';
import NotAuthorized from "../../Pages/NotAuthorized/NotAuthorized.jsx";

export const navigateBasedOnRole = (role, navigate) => {
    console.log('Navigating based on role:', role);
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
                pageTitle = 'FLAKEVILLE STORE';
                break;
            case '/weather':
                pageTitle = 'FLAKEVILLE WEATHER';
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
                pageTitle = 'FLAKEVILLE HOME';
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
                    <Route path="*" element={<NotAuthorized />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;