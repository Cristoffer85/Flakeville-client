import React from 'react';
import './Home.css'; // import the CSS file

function Home() {
    return (
        <>
            <div className="homePageTitleAlign">
                <h1 className="pageTitle">SNÖFJÄLLBY HOME</h1>
            </div>

            <div className="box1">
                <h2>Box Title</h2>
                <p>Box content...</p>
            </div>
            <div className="box2">
                <h2>Another Box Title</h2>
                <p>Another box content...</p>
            </div>
            {/* Add more boxes as needed */}
        </>
    );
}

export default Home;