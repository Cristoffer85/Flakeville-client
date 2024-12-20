import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { sendMessage } from '../../Api/ChatApi/ChatApi'; // Import sendMessage from ChatApi
import './Chat.css';

const Chat = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setSender(username);
    }
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
          <input type="text" value={sender} readOnly />
        </div>
        <div>
          <label>Receiver:</label>
          <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} required />
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