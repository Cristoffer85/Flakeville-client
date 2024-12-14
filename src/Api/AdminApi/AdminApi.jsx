import Cookies from 'js-cookie';
import config from '../Apiconfig';

export const createUser = async (user) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Creation failed: ' + await response.text());
    }
};

export const getAllUsers = async () => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/getAllUsers`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

export const getUser = async (username) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/getOneUser/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok || response.headers.get('Content-Length') === '0') {
        return null;
    }
    return await response.json();
};

export const updateUser = async (username, user) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/updateUser/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Update failed: ' + await response.text());
    }
};

export const deleteUser = async (username) => {
    const token = Cookies.get('token');
    await fetch(`${config.backendUrl}/admin/deleteOneUser/${username}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const createEmployee = async (employee) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/createEmployee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employee)
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Creation failed: ' + await response.text());
    }
};

export const getAllEmployees = async () => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/getAllEmployees`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

export const getEmployee = async (username) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/getOneEmployee/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok || response.headers.get('Content-Length') === '0') {
        return null;
    }
    return await response.json();
};

export const updateEmployee = async (username, employee) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/admin/updateEmployee/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employee)
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Update failed: ' + await response.text());
    }
};

export const deleteEmployee = async (username) => {
    const token = Cookies.get('token');
    await fetch(`${config.backendUrl}/admin/deleteEmployee/${username}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};