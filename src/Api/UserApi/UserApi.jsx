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
    return await response.json();
};