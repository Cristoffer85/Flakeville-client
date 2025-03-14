import React, { useState } from 'react';
import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../../../API2/ADMINAPI2/ADMINAPI2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeManagement({ employees, setEmployees, searchedEmployee, setSearchedEmployee }) {
    const [searchEmployeeUsername, setSearchEmployeeUsername] = useState('');
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeePosition, setNewEmployeePosition] = useState('');
    const [newEmployeeUsername, setNewEmployeeUsername] = useState('');
    const [newEmployeePassword, setNewEmployeePassword] = useState('');
    const [updateEmployeeName, setUpdateEmployeeName] = useState('');
    const [updateEmployeePosition, setUpdateEmployeePosition] = useState('');
    const [showUpdateEmployeeForm, setShowUpdateEmployeeForm] = useState(false);
    const [searched, setSearched] = useState(false);

    const employeeSearchSubmit = (event) => {
        event.preventDefault();
        getEmployee(searchEmployeeUsername).then(setSearchedEmployee);
        setSearched(true);
    };

    const employeeNewSubmit = async (event) => {
        event.preventDefault();
        const newEmployee = {
            name: newEmployeeName,
            position: newEmployeePosition,
            username: newEmployeeUsername,
            password: newEmployeePassword
        };
        try {
            const createdEmployee = await createEmployee(newEmployee);
            setEmployees([...employees, createdEmployee]);
            setNewEmployeeName('');
            setNewEmployeePosition('');
            setNewEmployeeUsername('');
            setNewEmployeePassword('');
        } catch (error) {
            console.error(error);
        }
    };

    const employeeUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedEmployee = {
            name: updateEmployeeName,
            position: updateEmployeePosition
        };
        try {
            const updatedEmployeeData = await updateEmployee(searchedEmployee.username, updatedEmployee);
            setSearchedEmployee(updatedEmployeeData);
            setShowUpdateEmployeeForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const employeeDeleteClick = async () => {
        try {
            await deleteEmployee(searchedEmployee.username);
            setSearchedEmployee(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Employee Management</h2>
            <ul className="list-group mb-4">
                {employees.map(employee => (
                    <li key={employee.id} className="list-group-item">
                        Username: {employee.username}
                    </li>
                ))}
            </ul>
            <h2 className="mb-4">Search Employees</h2>
            <form onSubmit={employeeSearchSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={searchEmployeeUsername}
                        onChange={e => setSearchEmployeeUsername(e.target.value)}
                        placeholder="Search for an employee"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            {searched && (
                searchedEmployee ? (
                    <div>
                        <h2>Searched Employee</h2>
                        <p>Username: {searchedEmployee.username}</p>
                        <button onClick={() => {
                            setSearchedEmployee(searchedEmployee);
                            setShowUpdateEmployeeForm(true);
                        }} className="btn btn-secondary me-2">Update</button>
                        <button onClick={employeeDeleteClick} className="btn btn-danger">Delete</button>
                    </div>
                ) : (
                    <p>Employee not in database</p>
                )
            )}
            {showUpdateEmployeeForm && (
                <form onSubmit={employeeUpdateSubmit} className="mb-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={updateEmployeeName}
                            onChange={e => setUpdateEmployeeName(e.target.value)}
                            placeholder="Update Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={updateEmployeePosition}
                            onChange={e => setUpdateEmployeePosition(e.target.value)}
                            placeholder="Update Position"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Update</button>
                </form>
            )}
            <h2 className="mb-4">Create New Employee</h2>
            <form onSubmit={employeeNewSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newEmployeeName}
                        onChange={e => setNewEmployeeName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newEmployeePosition}
                        onChange={e => setNewEmployeePosition(e.target.value)}
                        placeholder="Position"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newEmployeeUsername}
                        onChange={e => setNewEmployeeUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={newEmployeePassword}
                        onChange={e => setNewEmployeePassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default EmployeeManagement;