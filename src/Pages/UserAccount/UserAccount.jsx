import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserDetails, updateUserDetails } from '../../Api/UserApi/UserApi.jsx';

import './UserAccount.css';

function UserAccount() {
    const username = Cookies.get('username');
    const [currentSection, setCurrentSection] = useState('userDetails');
    const [userDetails, setUserDetails] = useState({});
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateTelephone, setUpdateTelephone] = useState('');
    const [updateBirthday, setUpdateBirthday] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');

    const calculateTotalPrice = (order) => {
        return order.products.reduce((total, product) => total + product.product.price * product.quantity, 0);
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const data = await getUserDetails(username);
        setUserDetails(data);
    };

    return (
        <div>
            <div className="sidebar">
                <p className="sidebar-welcome-message">Welcome, {username}!</p>
                <p onClick={() => setCurrentSection('userDetails')}>User Details</p>
                <p onClick={() => setCurrentSection('previousOrders')}>Previous Orders</p>
            </div>

            {currentSection === 'userDetails' && (
                <div className="userDetailsBox">
                    <h2>User Details</h2>
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Telephone: {userDetails.telephone}</p>
                    <p>Birthday: {userDetails.birthday}</p>
                    <p>Address: {userDetails.address}</p>
                    <h2>Update User Details</h2>
                    <form onSubmit={updateUserDetails}>
                        <input type="text" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)}
                               placeholder="Update Email" required/>
                        <input type="text" value={updateTelephone}
                               onChange={e => setUpdateTelephone(e.target.value)} placeholder="Update Telephone"
                               required/>
                        <input type="text" value={updateBirthday}
                               onChange={e => setUpdateBirthday(e.target.value)} placeholder="Update Birthday"
                               required/>
                        <input type="text" value={updateAddress}
                               onChange={e => setUpdateAddress(e.target.value)} placeholder="Update Address"
                               required/>
                        <button type="submit">Submit Update</button>
                    </form>
                </div>
            )}

            {currentSection === 'previousOrders' && (
                <div className="previousOrdersBox">
                    <h2>Previous Orders</h2>
                    {userDetails.orders && userDetails.orders.map((order, index) => (
                        <div key={index} className="orderDetails">
                            <h3>Order {index + 1}</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.products.map((product, i) => (
                                    <tr key={i}>
                                        <td>{product.product.name}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>Total Price</td>
                                    <td>{calculateTotalPrice(order)} :-</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserAccount;