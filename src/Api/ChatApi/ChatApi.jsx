import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../Apiconfig';

export const getMessages = async (username) => {
    const token = Cookies.get('token');
    const response = await axios.get(`${config.backendUrl}/rabbitmq/subscribe/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch messages: ' + response.statusText);
    }
    return response.data;
};

export const sendMessage = async (msgDto) => {
    const token = Cookies.get('token');
    const response = await axios.post(`${config.backendUrl}/rabbitmq/publish`, msgDto, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to send message: ' + response.statusText);
    }
    return response.data;
};