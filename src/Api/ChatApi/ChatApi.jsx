import config from '../Apiconfig';

export const sendMessage = async (msgDto, token) => {
    const response = await fetch(`${config.backendUrl}/chat/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(msgDto)
    });

    if (!response.ok) {
        throw new Error('Failed to send message: ' + await response.text());
    }
};

export const getMessages = async (sender, receiver, token) => {
    const response = await fetch(`${config.backendUrl}/chat/getMessages/${sender}/${receiver}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch messages: ' + await response.text());
    }

    return await response.json();
};

export const getUnreadMessagesCount = async (username, token) => {
    const response = await fetch(`${config.backendUrl}/chat/getUnreadMessagesCount/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch unread messages count: ' + await response.text());
    }

    return await response.json();
};

export const getUnreadMessagesSenders = async (username, token) => {
    const response = await fetch(`${config.backendUrl}/chat/getUnreadMessagesSenders/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch unread messages senders: ' + await response.text());
    }

    return await response.json();
};