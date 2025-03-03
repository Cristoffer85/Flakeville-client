import React, { useState, useEffect } from 'react';
import AppRouter from './Components/Router/Router.jsx';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PageTitleContext from './Contexts/PageTitleContext/PageTitleContext.jsx';
import CartContext from './Contexts/CartContext/CartContext.jsx';
import LiftsContext from './Contexts/LiftsContext/LiftsContext.jsx';
import { RoleProvider } from './Contexts/RoleContext/RoleContext.jsx';
import { UserProvider } from './Contexts/UserContext/UserContext.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const [cart, setCart] = useState([]);
    const [lifts, setLifts] = useState([]);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState(null);

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
        setUsername(username);
        setRole(userRole);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        Cookies.remove('isLoggedIn');
        Cookies.remove('token');
        setUsername(null);
        setRole(null);
    };

    return (
        <div className="App">
            <PageTitleContext.Provider value={pageTitle}>
                <CartContext.Provider value={{ cart, setCart }}>
                    <LiftsContext.Provider value={{ lifts, setLifts }}>
                        <RoleProvider>
                            <UserProvider>
                                <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout}
                                           showPopup={showPopup} setShowPopup={setShowPopup} setPageTitle={setPageTitle} />
                            </UserProvider>
                        </RoleProvider>
                    </LiftsContext.Provider>
                </CartContext.Provider>
            </PageTitleContext.Provider>
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </div>
    );
}

export default App;