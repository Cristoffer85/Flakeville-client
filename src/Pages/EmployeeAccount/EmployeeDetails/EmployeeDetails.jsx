import React, { useState, useEffect } from 'react';
import { getEmployeeData, updateEmployeeData } from '../../../Api/EmployeeApi/EmployeeApi.jsx';

import '../EmployeeAccount.css';

function EmployeeDetails({ username }) {
    const [employeeDetails, setEmployeeDetails] = useState({ name: '', position: '' });
    const [formFields, setFormFields] = useState({ name: '', position: '' });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        getEmployeeData(username)
            .then(data => setEmployeeDetails(data))
            .catch(error => console.error('Error:', error));
    }, [username]);

    const handleUpdateEmployeeData = async (event) => {
        event.preventDefault();

        try {
            await updateEmployeeData(username, formFields);
            setSuccessMessage('Information updated');
            setFormFields({ name: '', position: '' }); // Clear the form
            const updatedData = await getEmployeeData(username); // Fetch the updated employee details
            setEmployeeDetails(updatedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="employeeDetailsBox">
            <h2>Employee Details</h2>
            <p>Name: {employeeDetails.name}</p>
            <p>Position: {employeeDetails.position}</p>
            <form onSubmit={handleUpdateEmployeeData}>
                <input
                    type="text"
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={formFields.position}
                    onChange={(e) => setFormFields({ ...formFields, position: e.target.value })}
                    placeholder="Position"
                />
                <button type="submit">Update</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default EmployeeDetails;