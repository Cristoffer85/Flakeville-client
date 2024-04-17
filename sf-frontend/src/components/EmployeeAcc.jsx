import React, { useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './EmployeeAcc.css';
import {useNavigate} from "react-router-dom";
import UserContext from "./UserContext.jsx";

function Employee({ isLoggedIn }) {
    const username = useContext(UserContext);
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const navigate = useNavigate();

    const getEmployeeData = async () => {
        const token = Cookies.get('token'); // Get the token from cookies

        const response = await fetch(`http://localhost:8080/employee/getOneEmployee/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }

        const data = await response.json();
        setEmployeeDetails(data);
    };

    useEffect(() => {
        getEmployeeData().catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/account');
        }
    }, [isLoggedIn]);

    const updateEmployeeData = async (event) => {
        event.preventDefault();

        const token = Cookies.get('token');

        try {
            const response = await fetch(`http://localhost:8080/employee/updateEmployee/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ birthday, address, telephone, email })
            });

            if (response.ok) {
                console.log('Update successful');
                getEmployeeData(); // Fetch the updated employee details
            } else {
                console.log('Update failed:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="employeeAccPageTitleAlign">
                <h1 className="pageTitle">EMPLOYEE ACCOUNT PAGE</h1>
            </div>

            <div className="updateEmployeeDetailsBox">
                <h2>Welcome, {username}!</h2>
                {employeeDetails && (
                    <div className="employeeDetails">
                        <h2>Current Employee Details</h2>
                        <p>Birthday: {employeeDetails.birthday}</p>
                        <p>Address: {employeeDetails.address}</p>
                        <p>Telephone: {employeeDetails.telephone}</p>
                        <p>Email: {employeeDetails.email}</p>
                    </div>
                )}
                <form onSubmit={updateEmployeeData}>
                    <h2>Update Employee Details</h2>
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
        </>
    );
}

export default Employee;