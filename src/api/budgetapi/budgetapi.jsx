import config from '../apiconfig.jsx';

export const getBudget = async (username, token) => {
    const response = await fetch(`${config.backendUrl}/budget/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch budget: ' + await response.text());
    }
    return await response.json();
};

export const addField = async (username, fieldName, value, token) => {
    const response = await fetch(`${config.backendUrl}/budget/${username}/addField?fieldName=${fieldName}&value=${value}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to add budget field: ' + await response.text());
    }
    return await response.json();
};

export const deleteField = async (username, fieldName, token) => {
    const response = await fetch(`${config.backendUrl}/budget/${username}/deleteField?fieldName=${fieldName}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete budget field: ' + await response.text());
    }
    return await response.json();
};