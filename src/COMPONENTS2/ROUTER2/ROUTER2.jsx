import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HOC from "../HOC2/HOC2.jsx";

import Navbar from "../NAVBAR2/NAVBAR2.jsx";
import Home from '../../pages/home/home.jsx';
import AdminAcc from "../../pages/ADMINACCOUNT2/adminaccount.js";
import EmployeeAcc from "../../pages/employeeaccount/employeeaccount.jsx";
import UserAcc from "../../pages/USERACCOUNT2/USERACCOUNT2.jsx";
import Store from '../../pages/STORE2/STORE2.jsx';
import Cart from "../../pages/cart/cart.jsx";
import Weather from '../../pages/WEATHER2/WEATHER2.jsx';
import NotAuthorized from "../../pages/notauthorized/notauthorized.jsx";
import SignInPage from '../../pages/SIGNIN2/SIGNINPAGE2.jsx';
import SignUpPage from '../../pages/SIGNUP2/SIGNUPPAGE2.jsx';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

export const navigateBasedOnRole = (role, navigate) => {
    if (role === 'ADMIN') {
        navigate('/admin');
    } else if (role === 'EMPLOYEE') {
        navigate('/employee');
    } else if (role === 'USER') {
        navigate('/user');
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
            case '/signin':
                pageTitle = 'SIGN IN';
                break;
            case '/signup':
                pageTitle = 'SIGN UP';
                break;
            default:
                pageTitle = 'FLAKEVILLE HOME';
        }
        setPageTitle(pageTitle);
    }, [location, setPageTitle]);

    return null;
}

function AppRouter({ handleLogin, handleLogout, showPopup, setShowPopup, setPageTitle }) {
    const { authState } = useContext(AuthContext);
    const { isLoggedIn, role } = authState;
    const commonProps = { isLoggedIn, handleLogin, handleLogout, showPopup, setShowPopup, role };

    return (
        <Router>
            <PageTitleUpdater setPageTitle={setPageTitle} />
            <div>
                <Navbar {...commonProps} />
                <Routes>
                    <Route path="/store" element={<Store {...commonProps} />} />
                    <Route path="/weather" element={<Weather {...commonProps} />} />
                    <Route path="/" element={<Home {...commonProps} />} />
                    <Route path="/admin" element={<HOC requiredRole="ADMIN"><AdminAcc {...commonProps} /></HOC>} />
                    <Route path="/employee" element={<HOC requiredRole="EMPLOYEE"><EmployeeAcc {...commonProps} /></HOC>} />
                    <Route path="/user" element={<HOC requiredRole="USER"><UserAcc {...commonProps} /></HOC>} />
                    <Route path="/cart" element={<Cart {...commonProps} />} />
                    <Route path="/signin" element={<SignInPage {...commonProps} />} />
                    <Route path="/signup" element={<SignUpPage {...commonProps} />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    <Route path="*" element={<NotAuthorized />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;