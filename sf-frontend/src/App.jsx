import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import Cookies from 'js-cookie';

// Main component that mainly handles the login and logout functionalities, storing in cookies
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        const loggedIn = Cookies.get('isLoggedIn');
        if (token && loggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    // Function to login + save user's data in cookies
    const handleLogin = (username, token, userRole) => {
        setIsLoggedIn(true);
        Cookies.set('isLoggedIn', true);
        Cookies.set('token', token);
        Cookies.set('username', username);
        Cookies.set('role', userRole);
    };

    // Function to logout + remove user's data from cookies (This app/frontend only)
    const handleLogout = () => {
        setIsLoggedIn(false);
        Cookies.remove('isLoggedIn');
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('role');
    };

    return (
        <div className="App">
            <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} showPopup={showPopup} setShowPopup={setShowPopup} /> {}
        </div>
    );
}

export default App;