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

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setSender(username);
      const interval = setInterval(() => {
        if (receiver) fetchMessages(receiver);
      }, 5000); // Poll every 5 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [receiver]);

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
  }, []);

  const fetchMessages = async (username) => {
    try {
      const data = await getMessages(username);
      setMessages(data.map(msg => {
        const [sender, message] = msg.split(':');
        return { sender, message };
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgDto = { sender, receiver, message };

    try {
      const response = await sendMessage(msgDto);
      alert(response);
      fetchMessages(receiver);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
      <div className="chat-container">
        {!receiver ? (
          <div className="user-list">
            {userNames.map((user, index) => (
              <div key={index} className="user" onClick={() => setReceiver(user.username)}>
                {user.username}
              </div>
            ))}
          </div>
        ) : (
          <>
            <button onClick={() => setReceiver('')} className="back-button">Back</button>
            <div className="messages-container">
              <h3>Messages with {receiver}</h3>
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
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button type="submit">Send Message</button>
            </form>
          </>
        )}
      </div>
  );
}

export default Chat;