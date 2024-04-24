import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import './css/UserAccount.css';

function User() {
    const username = Cookies.get('username');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [orders, setOrders] = useState([]);
    useNavigate();

    useEffect(() => {
        getUserData().catch(error => console.error('Error:', error));
    }, []);

    const getUserData = async () => {
        const token = Cookies.get('token'); // Get the token from cookies
        const response = await fetch(`http://localhost:8080/user/getOneUser/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;

        }
        const data = await response.json();
        setUserDetails(data);
        setOrders(data.orders || []);

    };

    const updateUserData = async (event) => {
        event.preventDefault();

        const token = Cookies.get('token');

        try {
            const response = await fetch(`http://localhost:8080/user/updateUser/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ birthday, address, telephone, email })
            });

            if (response.ok) {
                console.log('Update successful');
                getUserData(); // Fetch the updated user details
            } else {
                console.log('Update failed:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="updateUserDetailsBox">
                <h2>Welcome, {username}!</h2>
                {userDetails && (
                    <div className="userDetails">
                        <h2>Current User Details</h2>
                        <p>Birthday: {userDetails.birthday}</p>
                        <p>Address: {userDetails.address}</p>
                        <p>Telephone: {userDetails.telephone}</p>
                        <p>Email: {userDetails.email}</p>
                    </div>
                )}
                <form onSubmit={updateUserData}>
                    <h2>Update User Details</h2>
                    <div className="form-field">
                        <label>Birthday:</label>
                        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Address:</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Telephone:</label>
                        <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} required/>
                    </div>
                    <div className="form-field">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
            <div className="userOrdersBox">
                <h2>Your Orders</h2>
                {orders.map((order, index) => (
                    <div key={index} className="order">
                        <h3>Order {index + 1}</h3>
                        {order.products.map((product, i) => (
                            <p key={i}>Product: {product.product.name}, Quantity: {product.quantity}</p>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default User;