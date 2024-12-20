import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { sendMessage } from '../../Api/ChatApi/ChatApi';
import { getAllUserNames } from '../../Api/UserApi/UserApi'; // Import getAllUserNames
import './Chat.css';

const Chat = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setSender(username);
    }

    const fetchUserNames = async () => {
      try {
        const data = await getAllUserNames();
        setUserNames(data);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchUserNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgDto = { sender, receiver, message };

    try {
      const response = await sendMessage(msgDto);
      alert(response);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div>
          <label>Send message to:</label>
          <select value={receiver} onChange={(e) => setReceiver(e.target.value)} required>
            <option value="">Select a user</option>
            {userNames.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Chat;