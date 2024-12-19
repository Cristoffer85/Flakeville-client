import Cookies from 'js-cookie';
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
        return await response.json();
    } else {
        throw new Error('Registration failed: ' + await response.text());
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
        throw new Error('Login failed: ' + await response.text());
    }
};

export const checkUsername = async (username) => {
    const response = await fetch(`${config.backendUrl}/checkUsername/${username}`);
    if (response.status === 409) {
        return true; // Username is taken
    } else {
        return false; // Username is available
    }
};