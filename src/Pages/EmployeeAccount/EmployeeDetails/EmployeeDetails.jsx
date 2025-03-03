import React, { useState, useEffect } from 'react';
import { getEmployeeData, updateEmployeeData } from '../../../Api/EmployeeApi/EmployeeApi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container">
            <h2 className="mb-4">Employee Details</h2>
            <p><strong>Name:</strong> {employeeDetails.name}</p>
            <p><strong>Position:</strong> {employeeDetails.position}</p>
            <form onSubmit={handleUpdateEmployeeData}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formFields.name}
                        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                        placeholder="Name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Position:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formFields.position}
                        onChange={(e) => setFormFields({ ...formFields, position: e.target.value })}
                        placeholder="Position"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            {successMessage && <p className="text-success mt-3">{successMessage}</p>}
        </div>
    );
}

export default EmployeeDetails;