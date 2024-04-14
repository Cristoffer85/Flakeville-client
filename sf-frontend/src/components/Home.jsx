import React from 'react';
import './Home.css'; // import the CSS file

function Home() {
    return (
        <div className="backgroundStyle">
            <div className="contentStyle">
                <h1>SNÖFJÄLLBY HOME</h1>
                <div className="box box1">
                    <h2>Box Title</h2>
                    <p>Box content...</p>
                </div>
                <div className="box box2">
                    <h2>Another Box Title</h2>
                    <p>Another box content...</p>
                </div>
                {/* Add more boxes as needed */}
            </div>
        </div>
    );
}

export default Home;