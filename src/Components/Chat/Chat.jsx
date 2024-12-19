import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sender, setSender] = useState('Pelle72');
    const [receiver, setReceiver] = useState('Receiver');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/rabbitmq/subscribe');
        eventSource.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };
        return () => {
            eventSource.close();
        };
    }, []);

    const sendMessage = async () => {
        const msgDto = { sender, receiver, message: newMessage };
        await axios.post('http://localhost:8080/rabbitmq/publish', msgDto);
        setNewMessage('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;