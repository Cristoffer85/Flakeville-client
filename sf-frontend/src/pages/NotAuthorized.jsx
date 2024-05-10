import React from 'react';
import './css/NotAuthorized.css';

function NotAuthorized() {
    return (
        <div className="notAuthenticated">
            <h1 className="sadFace">:(</h1>
            <h2 className="message">I'm sorry you're not authenticated to do that, try logging in instead!</h2>
        </div>
    );
}

export default NotAuthorized;