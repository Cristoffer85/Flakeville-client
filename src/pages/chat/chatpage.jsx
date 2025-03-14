import React, { useState, useEffect, useContext } from 'react';
import Chat from '../../components/chat/chat.jsx';
import { getAllUserNames } from '../../api/userapi/userapi.jsx';
import { getUnreadMessagesCount, getUnreadMessagesSenders } from '../../api/chatapi/chatapi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../contexts/authcontext/authcontext.jsx';

const ChatPage = ({ setUnreadMessages }) => {
    const { authState } = useContext(AuthContext);
    const { username: sender, token } = authState;
    const [userNames, setUserNames] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
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
                setUnreadMessages(count); // Update the unread messages count in the navbar
            } catch (error) {
                console.error('Error fetching unread messages:', error);
            }
        };

        if (sender) {
            fetchUserNames();
            fetchUnreadMessages();
        }
    }, [sender, token, setUnreadMessages]);

    const handleUserClick = (username) => {
        setSelectedUser(username);
        if (unreadSenders.has(username)) {
            setUnreadSenders(prev => {
                const newSet = new Set(prev);
                newSet.delete(username);
                return newSet;
            });
            setUnreadMessages(prev => prev - 1); // Update the unread messages count in the navbar
        }
    };

    return (
        <div className="container-fluid" style={{ paddingTop: '7rem', paddingBottom: '2rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active">Users</p>
                        {userNames.filter(user => user.username !== sender).map((user, index) => (
                            <button
                                key={index}
                                className={`list-group-item list-group-item-action ${selectedUser === user.username ? 'active' : ''}`}
                                onClick={() => handleUserClick(user.username)}
                            >
                                {user.username}
                                {unreadSenders.has(user.username) && <span className="badge bg-danger ms-2">Unread</span>}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-md-9">
                    {selectedUser && (
                        <div className="card">
                            <div className="card-body">
                                <Chat receiver={selectedUser} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;