import React, { useState, useEffect, useContext } from 'react';
import UserDetails from './userdetails/userdetails.jsx';
import PreviousOrders from './previousorders/previousorders.jsx';
import BudgetSection from './budgetsection/budgetsection.jsx';
import CreateFieldModal from './budgetsection/createfield/createfield.jsx';
import { getUserDetails } from '../../api/userapi/userapi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

function UserAccount({ handleLogout }) {
    const { authState } = useContext(AuthContext);
    const { username, token } = authState;
    const [currentSection, setCurrentSection] = useState('userDetails');
    const [userDetails, setUserDetails] = useState({});
    const [showCreateField, setShowCreateField] = useState(false);

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
                {/* Left Sidebar */}
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
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'budget' ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentSection('budget');
                                setShowCreateField(false); // Reset modal visibility
                            }}
                        >
                            Budget
                        </button>
                        {currentSection === 'budget' && (
                            <button
                                type="button"
                                className={`list-group-item list-group-item-action ${showCreateField ? 'active' : ''}`}
                                onClick={() => setShowCreateField(true)}
                                style={{ fontSize: '0.875rem' }}
                            >
                                - Create New Field
                            </button>
                        )}
                    </div>
                    <div className="list-group mt-3">
                        <button
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={handleLogout}
                            style={{
                                backgroundColor: 'darkgrey',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '0.5rem 1rem',
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                    {/* Create New Field Modal */}
                    {showCreateField && (
                        <div className="mt-4 position-relative">
                            <CreateFieldModal
                                onClose={() => setShowCreateField(false)}
                                onCreate={(fieldName, fieldValue) => {
                                    // Pass the create logic to BudgetSection
                                    setShowCreateField(false);
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Right Content */}
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
                    {currentSection === 'budget' && (
                        <div className="card">
                            <div className="card-body">
                                <BudgetSection username={username} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserAccount;