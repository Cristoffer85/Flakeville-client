import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import './EmployeeAcc.css';

function Employee() {
    const username = useContext(UserContext);
    const [employeeDetails, setEmployeeDetails] = useState({name: '', position: ''});
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
                body: JSON.stringify(employeeDetails)
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
        <div>
            <h1>Employee Page</h1>
            <p>Welcome, {username}! You can manage your tasks from here.</p>
            {employeeDetails && (
                <div className="employeeDetails">
                    <h2>Current Employee Details</h2>
                    <p>Username: {employeeDetails.username}</p>
                    <p>Role: {employeeDetails.role}</p>
                    <p>Email: {employeeDetails.email}</p>
                </div>
            )}
            <form onSubmit={updateEmployeeData}>
                <h2>Update Employee Details</h2>
                <div className="form-field">
                    <label>Name:</label>
                    <input type="text" value={employeeDetails.name}
                           onChange={e => setEmployeeDetails({...employeeDetails, name: e.target.value})} required/>
                </div>
                <div className="form-field">
                    <label>Position:</label>
                    <input type="text" value={employeeDetails.position}
                           onChange={e => setEmployeeDetails({...employeeDetails, position: e.target.value})} required/>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Employee;