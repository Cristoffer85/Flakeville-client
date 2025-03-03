import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotAuthorized() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-1">:(</h1>
                <h2>I'm sorry you're not authorized to do that, try logging in instead!</h2>
            </div>
        </div>
    );
}

export default NotAuthorized;