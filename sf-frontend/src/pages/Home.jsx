import React from 'react';
import './css/Home.css';

function Home() {
    return (
        <>
            <div className="box1">
                <h2>Welcome!</h2>
                <p>We welcome you to SnöFjällby. The metropol of both skiing - adventure, haven and utopia at
                    the same time!</p>
                <p>Feel free to navigate across our site and if youre lost, we guarantee you will find out where to go
                    ahead next!</p>
            </div>

            <div className="box2">
                <h2>News</h2>
                <p>News for today..</p>
            </div>

            <div className="box3">
                <h2>Latest products in store</h2>
                <p>Some really cool new products now in store!</p>
            </div>
        </>
    );
}

export default Home;