import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './Home';
import Account from './Account';
import Store from './Store';
import Weather from './Weather';
import AdminAcc from "./AdminAccount.jsx";
import EmployeeAcc from "./EmployeeAccount.jsx";
import UserAcc from "./UserAccount.jsx";
import Navbar from './Navbar';

// export const that uses the navigate function to navigate to the respective page based on user's role
export const navigateBasedOnRole = (role, username, navigate) => {
    if (role === 'ADMIN') {
        navigate('/admin');
    } else if (role === 'EMPLOYEE') {
        navigate('/employee');
    } else if (role === 'USER') {
        navigate(`/user`);
    }
}

function AppRouter({ isLoggedIn, handleLogin, handleLogout, username, showPopup, setShowPopup }) {
    const commonProps = { isLoggedIn, handleLogin, handleLogout, username, showPopup, setShowPopup };

    return (
        <Router>
            <div>
                <Navbar {...commonProps} />
                <Routes>
                    <Route path="/account" element={<Account {...commonProps} />} />
                    <Route path="/store" element={<Store {...commonProps} />} />
                    <Route path="/weather" element={<Weather {...commonProps} />} />
                    <Route path="/" element={<Home {...commonProps} />} />
                    <Route path="/admin" element={<AdminAcc {...commonProps} />} />
                    <Route path="/employee" element={<EmployeeAcc {...commonProps} />} />
                    <Route path="/user" element={<UserAcc {...commonProps} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;