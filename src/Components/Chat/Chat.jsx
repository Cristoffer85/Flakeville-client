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
  const [messages, setMessages] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setSender(username);
      fetchMessages(username); // Fetch messages for the logged-in user on load
    }
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const data = await getAllUserNames();
        setUserNames(data.filter(user => user.username !== sender)); // Exclude the current user
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchUserNames();
  }, [sender]);

  const fetchMessages = async (username) => {
    try {
      const data = await getMessages(username, sender); // Pass the sender as the logged-in user
      setMessages(prevMessages => ({
        ...prevMessages,
        [username]: data.map(msg => {
          const [msgSender, message] = msg.split(':');
          return { sender: msgSender, message };
        })
      }));
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleUserClick = (username) => {
    setReceiver(username);
    setError(''); // Clear any previous error message
    if (username === sender && !messages[username]) {
      fetchMessages(username); // Fetch messages for the logged-in user if not already fetched
    }
  };

  const handleClose = () => {
    setReceiver('');
    setError(''); // Clear any previous error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgDto = { sender, receiver, message };

    try {
      await sendMessage(msgDto);
      setMessages(prevMessages => ({
        ...prevMessages,
        [receiver]: [...(prevMessages[receiver] || []), { sender, message }]
      }));
      setMessage(''); // Clear the form
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="user-list">
          {userNames.map((user, index) => (
            <div key={index} className="user" onClick={() => handleUserClick(user.username)}>
              {user.username}
            </div>
          ))}
          <div className="user" onClick={() => handleUserClick(sender)}>
            {sender} (You)
          </div>
        </div>
        {receiver && (
          <div className="chat-form-container">
            <button onClick={handleClose} className="close-button">X</button>
            <div className="messages-container">
              <h3>Messages with {receiver}</h3>
              {error && <p className="error-message">{error}</p>}
              {messages[receiver] && messages[receiver].length > 0 ? (
                messages[receiver].map((msg, index) => (
                  <div key={index} className="message">
                    <p><strong>{msg.sender}:</strong> {msg.message}</p>
                  </div>
                ))
              ) : (
                <p>No messages</p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
              <div>
                <label>Message:</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;