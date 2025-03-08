import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../Apiconfig';

export const getMessages = async (user1, user2) => {
    const token = Cookies.get('token');
    const response = await axios.get(`${config.backendUrl}/rabbitmq/subscribe/${user1}/${user2}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Username': user1 // Include the logged-in user's username
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

export const getUnreadMessagesCount = async (username) => {
    const token = Cookies.get('token');
    const response = await axios.get(`${config.backendUrl}/rabbitmq/unread/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch unread messages count: ' + response.statusText);
    }

    return response.data;
};

export const getUnreadMessagesSenders = async (username) => {
    const token = Cookies.get('token');
    const response = await axios.get(`${config.backendUrl}/rabbitmq/unread/senders/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch unread messages senders: ' + response.statusText);
    }

    return response.data;
};