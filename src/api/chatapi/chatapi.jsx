import config from '../apiconfig.jsx';

const getToken = () => {
  return localStorage.getItem('token');
};

export const sendMessage = async (msgDto) => {
  const token = getToken();
  const response = await fetch(`${config.backendUrl}/rabbitmq/publish`, {
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

export const getMessages = async (sender, receiver) => {
  const token = getToken();
  const response = await fetch(`${config.backendUrl}/rabbitmq/subscribe/${sender}/${receiver}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Username': sender
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch messages: ' + await response.text());
  }

  return await response.json();
};

export const getUnreadMessagesCount = async (username) => {
  const token = getToken();
  const response = await fetch(`${config.backendUrl}/rabbitmq/unread/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch unread messages count: ' + await response.text());
  }

  return await response.json();
};

export const getUnreadMessagesSenders = async (username) => {
  const token = getToken();
  const response = await fetch(`${config.backendUrl}/rabbitmq/unread/senders/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch unread messages senders: ' + await response.text());
  }

  return await response.json();
};