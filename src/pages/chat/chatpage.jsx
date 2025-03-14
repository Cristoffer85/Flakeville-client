import React from 'react';
import Chat from '../../components/chat/chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
    return (
        <div className="container-fluid" style={{ paddingTop: '7rem', paddingBottom: '2rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;