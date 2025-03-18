import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HOC from "../hoc/hoc.jsx";

import Navbar from "../navbar/navbar.jsx";
import Home from '../../pages/home/home.jsx';
import AdminAcc from "../../pages/adminaccount/adminaccount.jsx";
import EmployeeAcc from "../../pages/employeeaccount/employeeaccount.jsx";
import UserAcc from "../../pages/useraccount/useraccount.jsx";
import Store from '../../pages/store/store.jsx';
import Cart from "../../pages/cart/cart.jsx";
import Weather from '../../pages/weather/weather.jsx';
import NotAuthorized from "../../pages/notauthorized/notauthorized.jsx";
import SignInPage from '../../pages/signin/signinpage.jsx';
import SignUpPage from '../../pages/signup/signuppage.jsx';
import ChatPage from '../../pages/chat/chatpage.jsx';
import LiftInfo from '../../pages/liftinfo/liftinfo.jsx';
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
            case '/chat':
                pageTitle = 'CHAT';
                break;
            case '/liftinfo':
                pageTitle = 'LIFT INFORMATION';
                break;
            default:
                pageTitle = '';
        }
        setPageTitle(pageTitle);
    }, [location, setPageTitle]);

    return null;
}

function AppRouter({ handleLogin, handleLogout, showPopup, setShowPopup, setPageTitle, unreadMessages, setUnreadMessages }) {
    const { authState } = useContext(AuthContext);
    const { isLoggedIn, role } = authState;
    const navigate = useNavigate();
    const commonProps = { isLoggedIn, handleLogin, handleLogout: () => handleLogout(navigate), showPopup, setShowPopup, role, unreadMessages, setUnreadMessages };

    return (
        <>
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
                    <Route path="/chat" element={<ChatPage {...commonProps} />} />
                    <Route path="/liftinfo" element={<LiftInfo {...commonProps} />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    <Route path="*" element={<NotAuthorized />} />
                </Routes>
            </div>
        </>
    );
}

export default AppRouter;