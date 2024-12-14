import React from 'react';
import './NotAuthorized.css';

function NotAuthorized() {
    return (
        <div className="notAuthenticated">
            <h1 className="sadFace">:(</h1>
            <h2 className="message">I'm sorry you're not authorized to do that, try logging in instead!</h2>
        </div>
    );
}

export default NotAuthorized;