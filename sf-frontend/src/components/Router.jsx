import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './Home';
import Account from './Account';
import Store from './Store';
import Weather from './Weather';
import Adminacc from "./AdminAcc.jsx";
import Employeeacc from "./EmployeeAcc.jsx";
import AdminAcc from "./AdminAcc.jsx";
import EmployeeAcc from "./EmployeeAcc.jsx";
import UserAcc from "./UserAcc.jsx";

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/account">Account</Link></li>
                        <li><Link to="/store">Store</Link></li>
                        <li><Link to="/weather">Weather</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/account" element={<Account />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminAcc />} />
                    <Route path="/employee" element={<EmployeeAcc />} />
                    <Route path="/user" element={<UserAcc />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;