import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Account from './Account';
import Store from './Store';
import Weather from './Weather';
import AdminAcc from "./AdminAcc.jsx";
import EmployeeAcc from "./EmployeeAcc.jsx";
import UserAcc from "./UserAcc.jsx";
import Navbar from './Navbar'; // import the Navbar component

function AppRouter({ isLoggedIn, handleLogin, handleLogout, username }) { // update this line
    return (
        <Router>
            <div>
                <Navbar handleLogin={handleLogin} />
                <Routes>
                    <Route path="/account" element={<Account isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminAcc />} />
                    <Route path="/employee" element={<EmployeeAcc />} />
                    <Route path="/user/:username" element={<UserAcc isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />} /> {/* update this line */}
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;