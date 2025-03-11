import React, { useState, useEffect, useContext } from 'react';
import { getEmployeeData, updateEmployeeData } from '../../../Api/EmployeeApi/EmployeeApi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../../Contexts/AuthContext/AuthContext.jsx';

function EmployeeDetails({ username }) {
    const { authState } = useContext(AuthContext);
    const { token } = authState;
    const [employeeDetails, setEmployeeDetails] = useState({ name: '', position: '' });
    const [formFields, setFormFields] = useState({ name: '', position: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const data = await getEmployeeData(username, token);
                setEmployeeDetails(data);
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Failed to fetch employee data.');
            }
        };

        fetchEmployeeData();
    }, [username, token]);

    const handleUpdateEmployeeData = async (event) => {
        event.preventDefault();

        try {
            await updateEmployeeData(username, formFields, token);
            setSuccessMessage('Information updated');
            setFormFields({ name: '', position: '' }); // Clear the form
            const updatedData = await getEmployeeData(username, token); // Fetch the updated employee details
            setEmployeeDetails(updatedData);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to update employee data.');
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Employee Details</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
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