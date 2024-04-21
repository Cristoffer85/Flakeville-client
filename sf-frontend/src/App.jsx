import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import Cookies from 'js-cookie';
import PageTitleContext from './components/PageTitleContext';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home'); // Add this line

    useEffect(() => {
        const token = Cookies.get('token');
        const loggedIn = Cookies.get('isLoggedIn');
        if (token && loggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (username, token, userRole) => {
        setIsLoggedIn(true);
        Cookies.set('isLoggedIn', true);
        Cookies.set('token', token);
        Cookies.set('username', username);
        Cookies.set('role', userRole);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        Cookies.remove('isLoggedIn');
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('role');
    };

    return (
        <div className="App">
            <PageTitleContext.Provider value={pageTitle}> {}
                <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} showPopup={showPopup} setShowPopup={setShowPopup} setPageTitle={setPageTitle} /> {/* Pass the setPageTitle function as a prop */}
            </PageTitleContext.Provider>
        </div>
    );
}

export default App;