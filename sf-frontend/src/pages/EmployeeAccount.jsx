import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import './css/EmployeeAccount.css';

function Employee() {
    const username = Cookies.get('username');
    const [employeeDetails, setEmployeeDetails] = useState({name: '', position: ''});
    const [formFields, setFormFields] = useState({name: '', position: ''});
    const [successMessage, setSuccessMessage] = useState('');
    useNavigate();

    useEffect(() => {
        getEmployeeData().catch(error => console.error('Error:', error));
    }, []);

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
                body: JSON.stringify(formFields)
            });

            if (response.ok) {
                console.log('Update successful');
                setSuccessMessage('Information updated');
                setFormFields({name: '', position: ''}); // Clear the form
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
            <div className="userAccPageTitleAlign">
                <h1 className="pageTitle">EMPLOYEE ACCOUNT PAGE</h1>
            </div>

            <div className="updateEmployeeDetailsBox">
                <p>Welcome, {username}!</p>
                {employeeDetails && (
                    <div className="employeeDetails">
                        <h2>Current Employee Details</h2>
                        <p>Name: {employeeDetails.name}</p>
                        <p>Position: {employeeDetails.position}</p>
                    </div>
                )}
                <form onSubmit={updateEmployeeData}>
                    <h2>Update Employee Details</h2>
                    <div className="form-field">
                        <label>Name:</label>
                        <input type="text" value={formFields.name}
                               onChange={e => setFormFields({...formFields, name: e.target.value})} required/>
                    </div>
                    <div className="form-field">
                        <label>Position:</label>
                        <input type="text" value={formFields.position}
                               onChange={e => setFormFields({...formFields, position: e.target.value})} required/>
                    </div>
                    <button type="submit">Update</button>
                    <p>{successMessage}</p>
                </form>
            </div>
        </>
    );
}

export default Employee;