import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './Home';
import Account from './Account';
import Store from './Store';
import Weather from './Weather';
import AdminAcc from "./AdminAcc.jsx";
import EmployeeAcc from "./EmployeeAcc.jsx";
import UserAcc from "./UserAcc.jsx";
import Navbar from './Navbar'; // import the Navbar component

function AppRouter() {
    return (
        <Router>
            <div>
                <Navbar /> {}
                <Routes>
                    <Route path="/account" element={<Account />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminAcc />} />
                    <Route path="/employee" element={<EmployeeAcc />} />
                    <Route path="/user/:username" element={<UserAcc />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;