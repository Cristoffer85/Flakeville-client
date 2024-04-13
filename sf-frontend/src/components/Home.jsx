import React from 'react';

function Home() {
    const backgroundStyle = {
        backgroundImage: "url('/MainBackground.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100hh', // Adjust the height according to your needs (vh = viewport height, hh = half of the viewport height, etc.)
        // You can add more background-related styles here, like backgroundRepeat, backgroundAttachment, etc.
    };

    return (
        <div style={backgroundStyle}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
                <h1>Home Page</h1>
                <p>Welcome to our website! Here you can find information about our products, view your account details, and more.</p>
            </div>
        </div>
    );
}

export default Home;

