import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import UserContext from './components/UserContext'; // import the UserContext

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <UserContext.Provider value={username}> {/* use the UserContext.Provider here */}
            <div className="App">
                <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
            </div>
        </UserContext.Provider>
    );
}

export default App;