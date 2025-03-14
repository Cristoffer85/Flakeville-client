import React, { useState, useEffect, useContext } from 'react';
import UserDetails from './userdetails/userdetails.jsx';
import PreviousOrders from './previousorders/previousorders.jsx';
import Chat from '../../components/chat/chat.jsx';
import { getUserDetails } from '../../api/userapi/userapi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

function UserAccount() {
    const { authState } = useContext(AuthContext);
    const { username, token } = authState;
    const [currentSection, setCurrentSection] = useState('userDetails');
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getUserDetails(username, token);
                if (data) {
                    setUserDetails(data);
                } else {
                    console.error('User details not found:', data);
                }
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        if (username && token) {
            fetchUserDetails();
        }
    }, [username, token]);

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem', paddingBottom: '2rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active">Welcome, {username}!</p>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'userDetails' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('userDetails')}
                        >
                            User Details
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'previousOrders' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('previousOrders')}
                        >
                            Previous Orders
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    {currentSection === 'userDetails' && (
                        <div className="card">
                            <div className="card-body">
                                <UserDetails username={username} />
                            </div>
                        </div>
                    )}
                    {currentSection === 'previousOrders' && (
                        <div className="card" style={{ height: 'calc(100vh - 9rem)', overflowY: 'auto' }}>
                            <div className="card-body">
                                <PreviousOrders orders={userDetails.orders || []} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserAccount;