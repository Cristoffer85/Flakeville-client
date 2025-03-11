import React, { useState, useEffect, useContext } from 'react';
import AppRouter from './Components/Router/Router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitleContext from './Contexts/PageTitleContext/PageTitleContext.jsx';
import CartContext from './Contexts/CartContext/CartContext.jsx';
import LiftsContext from './Contexts/LiftsContext/LiftsContext.jsx';
import AuthContext from './Contexts/AuthContext/AuthContext.jsx';

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