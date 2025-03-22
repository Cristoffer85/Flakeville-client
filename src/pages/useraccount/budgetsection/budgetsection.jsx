import React, { useState, useEffect, useContext } from 'react';
import { getBudget, addField, deleteField } from '../../../api/budgetapi/budgetapi.jsx';
import AuthContext from '../../../contexts/authcontext/authcontext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function BudgetSection({ username }) {
    const { authState } = useContext(AuthContext);
    const { token } = authState;

    const [budget, setBudget] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [editedFieldName, setEditedFieldName] = useState('');
    const [editedFieldValue, setEditedFieldValue] = useState('');

    useEffect(() => {
        fetchBudget();
    }, []);

    const fetchBudget = async () => {
        try {
            const data = await getBudget(username, token);
            setBudget(data);
        } catch (error) {
            console.error('Failed to fetch budget:', error);
        }
    };

    const handleAddField = async (fieldName, fieldValue) => {
        try {
            await addField(username, fieldName, parseFloat(fieldValue), token);
            fetchBudget(); // Refresh budget
        } catch (error) {
            console.error('Failed to add field:', error);
        }
    };

    const handleDeleteField = async (fieldName) => {
        try {
            await deleteField(username, fieldName, token);
            fetchBudget(); // Refresh budget
        } catch (error) {
            console.error('Failed to delete field:', error);
        }
    };

    const handleEditField = (fieldName, value) => {
        setEditingField(fieldName);
        setEditedFieldName(fieldName);
        setEditedFieldValue(value);
    };

    const handleSaveEdit = async () => {
        try {
            // Update the field directly without deleting and re-adding
            const updatedFields = { ...budget.fields, [editedFieldName]: parseFloat(editedFieldValue) };
            setBudget((prevBudget) => ({
                ...prevBudget,
                fields: updatedFields,
            }));

            // Persist the changes to the server
            await addField(username, editedFieldName, parseFloat(editedFieldValue), token);

            setEditingField(null);
        } catch (error) {
            console.error('Failed to save edited field:', error);
        }
    };

    // Calculate the total value of all fields
    const calculateTotalValue = () => {
        return Object.values(budget.fields || {}).reduce((total, value) => total + value, 0);
    };

    return (
        <div className="container">
            <h2 className="mb-4">Budget (Monthly)</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {budget.fields &&
                        Object.entries(budget.fields).map(([fieldName, value]) => (
                            <tr key={fieldName}>
                                {editingField === fieldName ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editedFieldName}
                                                onChange={(e) => setEditedFieldName(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={editedFieldValue}
                                                onChange={(e) => setEditedFieldValue(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={handleSaveEdit}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setEditingField(null)}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{fieldName}</td>
                                        <td>{value}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditField(fieldName, value)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteField(fieldName)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    {/* Add a row for the total value */}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{calculateTotalValue()}</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BudgetSection;