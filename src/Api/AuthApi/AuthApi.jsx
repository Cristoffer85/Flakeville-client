import config from '../Apiconfig';

export const registerUser = async (username, password) => {
    const response = await fetch(`${config.backendUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        // Ensure the role is included in the response
        return { ...data, role: 'USER' };
    } else {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
    }
};

export const loginUser = async (username, password) => {
    const response = await fetch(`${config.backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
    }
};