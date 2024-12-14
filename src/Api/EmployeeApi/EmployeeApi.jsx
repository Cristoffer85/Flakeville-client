import Cookies from 'js-cookie';
import config from '../Apiconfig';

export const getEmployeeData = async (username) => {
    const token = Cookies.get('token');

    const response = await fetch(`${config.backendUrl}/employee/getOneEmployee/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch employee data: ' + await response.text());
    }

    return await response.json();
};

export const updateEmployeeData = async (username, formFields) => {
    const token = Cookies.get('token');

    const response = await fetch(`${config.backendUrl}/employee/updateEmployee/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formFields)
    });

    if (!response.ok) {
        throw new Error('Update failed: ' + await response.text());
    }

    return await response.json();
};

export const fetchLifts = async () => {
    const response = await fetch(`${config.backendUrl}/skilifts/getAllLifts`);
    if (!response.ok) {
        throw new Error('Failed to fetch lifts: ' + await response.text());
    }
    return await response.json();
};

export const startLift = async (id) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/skilifts/startLift/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
        })
    });

    if (!response.ok) {
        throw new Error('Error starting lift: ' + await response.text());
    }

    return await response.json();
};

export const stopLift = async (id) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/skilifts/stopLift/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
        })
    });

    if (!response.ok) {
        throw new Error('Error stopping lift: ' + await response.text());
    }

    return await response.json();
};