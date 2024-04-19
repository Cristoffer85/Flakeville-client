import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Account from './Account';
import Store from './Store';
import Weather from './Weather';
import AdminAcc from "./AdminAccount.jsx";
import EmployeeAcc from "./EmployeeAccount.jsx";
import UserAcc from "./UserAccount.jsx";
import Navbar from './Navbar';

function AppRouter({ isLoggedIn, handleLogin, handleLogout, username, showPopup, setShowPopup }) {
    return (
        <Router>
            <div>
                <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} showPopup={showPopup} setShowPopup={setShowPopup} /> {}
                <Routes>
                    <Route path="/account" element={<Account isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminAcc />} />
                    <Route path="/employee" element={<EmployeeAcc />} />
                    <Route path="/user/:username" element={<UserAcc isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />} /> {}
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;