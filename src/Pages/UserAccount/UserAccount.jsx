import React, { useState } from 'react';
import Cookies from 'js-cookie';
import UserDetails from './UserDetails/UserDetails.jsx';
import PreviousOrders from './PreviousOrders/PreviousOrders.jsx';
import Chat from '../../Components/Chat/Chat.jsx';

import './UserAccount.css';

function UserAccount() {
    const username = Cookies.get('username');
    const [currentSection, setCurrentSection] = useState('userDetails');
    const [userDetails, setUserDetails] = useState({});

    return (
        <div>
            <div className="sidebar">
                <p className="sidebar-welcome-message">Welcome, {username}!</p>
                <p onClick={() => setCurrentSection('userDetails')}>User Details</p>
                <p onClick={() => setCurrentSection('previousOrders')}>Previous Orders</p>
                <Chat />
            </div>

            {currentSection === 'userDetails' && <UserDetails username={username} />}
            {currentSection === 'previousOrders' && <PreviousOrders orders={userDetails.orders} />}
        </div>
    );
}

export default UserAccount;