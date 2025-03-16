import React, { useState, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/router/router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitleContext from './contexts/pagetitlecontext/pagetitlecontext.jsx';
import CartContext from './contexts/cartcontext/cartcontext.jsx';
import LiftsContext from './contexts/liftscontext/liftscontext.jsx';
import AuthContext from './contexts/authcontext/authcontext.jsx';

function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const [cart, setCart] = useState([]);
    const [lifts, setLifts] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const { authState, login, logout } = useContext(AuthContext);

    const handleLogout = (navigate) => {
        logout();
        navigate('/');
    };

    return (
        <div className="App">
            <PageTitleContext.Provider value={pageTitle}>
                <CartContext.Provider value={{ cart, setCart }}>
                    <LiftsContext.Provider value={{ lifts, setLifts }}>
                        <Router>
                            <AppRouter 
                                isLoggedIn={authState.isLoggedIn} 
                                handleLogin={login} 
                                handleLogout={handleLogout}
                                showPopup={showPopup} 
                                unreadMessages={unreadMessages}
                                setShowPopup={setShowPopup} 
                                setPageTitle={setPageTitle} 
                                setUnreadMessages={setUnreadMessages}
                            />
                        </Router>
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