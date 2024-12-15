import React, { useState } from 'react';
import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../../../Api/AdminApi/AdminApi.jsx';
import '../AdminAccount.css';

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
        <div className="employeeManagementBox">
                    <h2>Employees</h2>
                    {employees.map(employee => (
                        <div key={employee.id} className="employeeDetails">
                            <p>Username: {employee.username}</p>
                        </div>
                    ))}
                    <h2>Search Employees</h2>
                    <form onSubmit={employeeSearchSubmit}>
                        <input type="text" value={searchEmployeeUsername}
                               onChange={e => setSearchEmployeeUsername(e.target.value)} placeholder="Search for an employee"
                               required/>
                        <button type="submit">Search</button>
                    </form>
                    {searched && (
                        searchedEmployee ? (
                            <div>
                                <h2>Searched Employee</h2>
                                <p>Username: {searchedEmployee.username}</p>
                                <button onClick={() => {
                                    setSearchedEmployee(searchedEmployee);
                                    setShowUpdateEmployeeForm(true);
                                }}>Update
                                </button>
                                <button onClick={employeeDeleteClick}>Delete</button>
                            </div>
                        ) : (
                            <p>Employee not in database</p>
                        )
                    )}
                    {showUpdateEmployeeForm && (
                        <form onSubmit={employeeUpdateSubmit}>
                            <input type="text" value={updateEmployeeName} onChange={e => setUpdateEmployeeName(e.target.value)}
                                   placeholder="Update Name" required/>
                            <input type="text" value={updateEmployeePosition}
                                   onChange={e => setUpdateEmployeePosition(e.target.value)} placeholder="Update Position"
                                   required/>
                            <button type="submit">Submit Update</button>
                        </form>
                    )}
                    <h2>Create New Employee</h2>
                    <form onSubmit={employeeNewSubmit}>
                        <input type="text" value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)}
                               placeholder="Name" required/>
                        <input type="text" value={newEmployeePosition} onChange={e => setNewEmployeePosition(e.target.value)}
                               placeholder="Position" required/>
                        <input type="text" value={newEmployeeUsername} onChange={e => setNewEmployeeUsername(e.target.value)}
                               placeholder="Username" required/>
                        <input type="password" value={newEmployeePassword}
                               onChange={e => setNewEmployeePassword(e.target.value)} placeholder="Password" required/>
                        <button type="submit">Create</button>
                    </form>
                    <p>{newEmployeeName}</p>
                </div>
    );
}

export default EmployeeManagement;