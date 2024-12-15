import React, { useState, useEffect } from 'react';
import AppRouter from './Components/Router/Router.jsx';
import Cookies from 'js-cookie';

import Footer from './Components/Footer/Footer.jsx';
import PageTitleContext from './Contexts/PageTitleContext/PageTitleContext.jsx';
import CartContext from './Contexts/CartContext/CartContext.jsx';
import LiftsContext from './Contexts/LiftsContext/LiftsContext.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const [cart, setCart] = useState([]);
    const [lifts, setLifts] = useState([]);

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
                <CartContext.Provider value={{cart, setCart}}>
                    <LiftsContext.Provider value={{lifts, setLifts}}>
                        <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout}
                                   showPopup={showPopup} setShowPopup={setShowPopup} setPageTitle={setPageTitle}/>
                    </LiftsContext.Provider>
                </CartContext.Provider>
            </PageTitleContext.Provider>
            
            <Footer />
        </div>
    );
}

export default App;