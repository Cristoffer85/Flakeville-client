import config from '../Apiconfig';
import Cookies from 'js-cookie';

export const getUserDetails = async (username) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/user/getOneUser/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

export const updateUserDetails = async (username, email, telephone, birthday, address) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/user/updateUser/${username}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            telephone,
            birthday,
            address
        })
    });

    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(`Failed to update user details: ${errorText}`);
    }
};

export const getAllUserNames = async () => {
    const response = await fetch(`${config.backendUrl}/chat/getAllUserNames`);
    if (!response.ok) {
        throw new Error('Failed to fetch user names: ' + await response.text());
    }
    return await response.json();
};