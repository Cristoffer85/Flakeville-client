import React, { useState, useEffect, useContext } from 'react';
import AppRouter from './COMPONENTS2/ROUTER2/ROUTER2.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitleContext from './CONTEXTS2/PAGETITLECONTEXT2/PAGETITLECONTEXT2.js';
import CartContext from './CONTEXTS2/CARTCONTEXT2/CARTCONTEXT2.js';
import LiftsContext from './CONTEXTS2/LIFTSCONTEXT2/LIFTSCONTEXT2.js';
import AuthContext from './CONTEXTS2/AUTHCONTEXT2/AUTHCONTEXT2.js';

function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const [cart, setCart] = useState([]);
    const [lifts, setLifts] = useState([]);
    const { authState, login, logout } = useContext(AuthContext);

    return (
        <div className="App">
            <PageTitleContext.Provider value={pageTitle}>
                <CartContext.Provider value={{ cart, setCart }}>
                    <LiftsContext.Provider value={{ lifts, setLifts }}>
                        <AppRouter 
                            isLoggedIn={authState.isLoggedIn} 
                            handleLogin={login} 
                            handleLogout={logout}
                            showPopup={showPopup} 
                            setShowPopup={setShowPopup} 
                            setPageTitle={setPageTitle} 
                        />
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