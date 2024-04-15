import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import UserContext from './components/UserContext';
import Cookies from 'js-cookie';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        const loggedIn = Cookies.get('isLoggedIn');
        const username = Cookies.get('username');
        if (token && loggedIn) {
            setIsLoggedIn(true);
            setUsername(username);
        }
    }, []);

    const handleLogin = (username, token) => {
        setIsLoggedIn(true);
        setUsername(username);
        Cookies.set('isLoggedIn', true);
        Cookies.set('token', token);
        Cookies.set('username', username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        Cookies.remove('isLoggedIn');
        Cookies.remove('token');
        Cookies.remove('username');
    };
    return (
        <UserContext.Provider value={username}>
            <div className="App">
                <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} showPopup={showPopup} setShowPopup={setShowPopup} /> {}
            </div>
        </UserContext.Provider>
    );
}

export default App;