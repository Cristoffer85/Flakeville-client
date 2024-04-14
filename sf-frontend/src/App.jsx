import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router.jsx';
import UserContext from './components/UserContext'; // import the UserContext
import Cookies from 'js-cookie'; // import js-cookie

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        const loggedIn = Cookies.get('isLoggedIn'); // get the logged-in state from cookies
        const username = Cookies.get('username'); // get the username from cookies
        if (token && loggedIn) {
            setIsLoggedIn(true);
            setUsername(username); // set the username to the username from cookies
        }
    }, []);

    const handleLogin = (username, token) => {
        setIsLoggedIn(true);
        setUsername(username);
        Cookies.set('isLoggedIn', true); // set the logged-in state in cookies
        Cookies.set('token', token); // set the token in cookies
        Cookies.set('username', username); // set the username in cookies
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        Cookies.remove('isLoggedIn'); // remove the logged-in state from cookies
        Cookies.remove('token'); // remove the token from cookies
        Cookies.remove('username'); // remove the username from cookies
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