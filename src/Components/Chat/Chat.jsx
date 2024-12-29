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
  const [userMessages, setUserMessages] = useState({}); // New state for user messages

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
      const fetchedMessages = data.map(msg => {
        const [msgSender, message] = msg.split(':');
        return { sender: msgSender, message };
      });
      setMessages(fetchedMessages);
      setUserMessages(prev => ({ ...prev, [username]: fetchedMessages })); // Save fetched messages
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('You can only view your own messages.');
      } else {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleUserClick = (username) => {
    setReceiver(username);
    const userMsgs = userMessages[username] || [];
    setMessages(userMsgs); // Load messages for the selected user
    if (username === sender) {
      fetchMessages(username); // Fetch messages for the logged-in user
    }
  };

  const handleClose = () => {
    setReceiver('');
    setMessages([]); // Clear messages
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgDto = { sender, receiver, message };

    try {
      await sendMessage(msgDto);
      const newMessage = { sender, message };
      setMessages(prevMessages => [...prevMessages, newMessage]); // Add the new message to the state
      setUserMessages(prev => ({
        ...prev,
        [receiver]: [...(prev[receiver] || []), newMessage]
      })); // Update user messages
      setMessage(''); // Clear the form
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
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
        </div>
        {receiver && (
          <div className="chat-form-container">
            <button onClick={handleClose} className="close-button">X</button>
            <div className="messages-container">
              <h3>Messages with {receiver}</h3>
              {error && <p className="error-message">{error}</p>}
              {messages.length > 0 ? (
                messages.map((msg, index) => (
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