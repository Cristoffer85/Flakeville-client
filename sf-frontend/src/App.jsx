import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import Cookies from 'js-cookie';
import PageTitleContext from './components/PageTitleContext';
import CartContext from "./components/CartContext.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const [cart, setCart] = useState([]);


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
            <PageTitleContext.Provider value={pageTitle}>
                <CartContext.Provider value={{ cart, setCart }}>
                    <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} showPopup={showPopup} setShowPopup={setShowPopup} setPageTitle={setPageTitle} />
                </CartContext.Provider>
            </PageTitleContext.Provider>
        </div>
    );
}

export default App;