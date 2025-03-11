import React, { useState, useEffect, useContext } from 'react';
import { sendMessage, getMessages, getUnreadMessagesCount, getUnreadMessagesSenders } from '../../Api/ChatApi/ChatApi';
import { getAllUserNames } from '../../Api/UserApi/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../Contexts/AuthContext/AuthContext.jsx';

const Chat = () => {
  const { authState } = useContext(AuthContext);
  const { username: sender, token } = authState;
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});
  const [unreadSenders, setUnreadSenders] = useState(new Set());

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const data = await getAllUserNames();
        setUserNames(data);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    const fetchUnreadMessages = async () => {
      try {
        const count = await getUnreadMessagesCount(sender, token);
        const senders = await getUnreadMessagesSenders(sender, token);
        setUnreadCounts(count);
        setUnreadSenders(new Set(senders));
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    };

    if (sender) {
      fetchUserNames();
      fetchUnreadMessages();
    }
  }, [sender, token]);

  const fetchMessages = async (receiver) => {
    try {
      const data = await getMessages(sender, receiver, token);
      setMessages(data);
      setError('');
      // Remove receiver from unread senders set
      setUnreadSenders(prev => {
        const newSet = new Set(prev);
        newSet.delete(receiver);
        return newSet;
      });
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

    try {
      await sendMessage(msgDto, token);
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            {userNames.filter(user => user.username !== sender).map((user, index) => (
              <button key={index} className="list-group-item list-group-item-action" onClick={() => handleUserClick(user.username)}>
                {user.username}
                {unreadSenders.has(user.username) && <span className="badge bg-danger ms-2">Unread</span>}
              </button>
            ))}
          </div>
        </div>
        {receiver && (
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <button onClick={handleClose} className="btn btn-danger btn-sm float-end">X</button>
                <h3>Messages with {receiver}</h3>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {messages.length > 0 ? (
                    messages.map((msg, index) => {
                      const [messageSender, messageContent] = msg.split(': ');
                      return (
                        <div key={index} className="mb-2">
                          <strong>{messageSender}:</strong> {messageContent}
                        </div>
                      );
                    })
                  ) : (
                    <p>No messages</p>
                  )}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Message:</label>
                    <textarea className="form-control" value={message} onChange={handleMessageChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;