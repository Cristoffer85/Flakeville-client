import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import UserContext from './components/UserContext';
import RoleContext from './components/RoleContext';
import Cookies from 'js-cookie';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        const loggedIn = Cookies.get('isLoggedIn');
        const username = Cookies.get('username');
        const role = Cookies.get('role');
        if (token && loggedIn) {
            setIsLoggedIn(true);
            setUsername(username);
            setRole(role);
        }
    }, []);

    const handleLogin = (username, token, userRole) => {
        setIsLoggedIn(true);
        setUsername(username);
        setRole(userRole);
        Cookies.set('isLoggedIn', true);
        Cookies.set('token', token);
        Cookies.set('username', username);
        Cookies.set('role', userRole);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setRole('');
        Cookies.remove('isLoggedIn');
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('role');
    };
    return (
        <UserContext.Provider value={username}>
            <RoleContext.Provider value={role}>
                <div className="App">
                    <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} showPopup={showPopup} setShowPopup={setShowPopup} /> {}
                </div>
            </RoleContext.Provider>
        </UserContext.Provider>
    );
}

export default App;