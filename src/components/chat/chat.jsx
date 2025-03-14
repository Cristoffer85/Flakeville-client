import React, { useState, useEffect, useContext } from 'react';
import { sendMessage, getMessages } from '../../api/chatapi/chatapi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

const Chat = ({ receiver }) => {
    const { authState } = useContext(AuthContext);
    const { username: sender, token } = authState;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages(sender, receiver, token);
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

        if (receiver) {
            fetchMessages();
        }
    }, [sender, receiver, token]);

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
            <div className="card">
                <div className="card-body">
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
    );
};

export default Chat;