import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { sendMessage, getMessages } from '../../Api/ChatApi/ChatApi';
import { getAllUserNames } from '../../Api/UserApi/UserApi';
import './Chat.css';

const Chat = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setSender(username);
    }
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const data = await getAllUserNames();
        setUserNames(data);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchUserNames();
  }, [sender]);

  const fetchMessages = async (receiver) => {
    try {
      const data = await getMessages(sender, receiver);
      console.log('Fetched messages:', data); // Debug log
      setMessages(data);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('You can only view your own messages.');
      } else {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleUserClick = async (username) => {
    setReceiver(username);
    await fetchMessages(username);
  };

  const handleClose = () => {
    setReceiver('');
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgDto = { sender, receiver, message };
    console.log('Sending message:', msgDto); // Debug log
  
    try {
      await sendMessage(msgDto);
      // Optimistically update the local state
      setMessages(prevMessages => [...prevMessages, `${sender}: ${message}`]);
      setMessage('');
      // Optionally, refresh messages after a short delay
      setTimeout(() => fetchMessages(receiver), 500);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };
  

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="user-list">
          {userNames.filter(user => user.username !== sender).map((user, index) => (
            <div key={index} className="user" onClick={() => handleUserClick(user.username)}>
              {user.username}
            </div>
          ))}
        </div>
        {receiver && (
          <div className="chat-form-container">
            <button onClick={handleClose} className="close-button">X</button>
            <div className="messages-container">
              <h3>Messages with {receiver}</h3>
              {error && <p className="error-message">{error}</p>}
              {messages.length > 0 ? (
                messages.map((msg, index) => {
                  const [messageSender, messageContent] = msg.split(': ');
                  return (
                    <div key={index} className="message">
                      <p><strong>{messageSender}:</strong> {messageContent}</p>
                    </div>
                  );
                })
              ) : (
                <p>No messages</p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
              <div>
                <label>Message:</label>
                <textarea value={message} onChange={handleMessageChange} required />
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;