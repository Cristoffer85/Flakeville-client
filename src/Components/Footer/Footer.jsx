import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid p-0 mt-auto">
      <div className="row">
        <div className="col-12 p-3 text-center" style={{ backgroundColor: 'lightgray', color: 'black', height: '100px', fontWeight: '600' }}>
          <p>Welcome to FLAKEVILLE! Your one-stop powderdestination for all your skiing needs.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-3 text-center" style={{ backgroundColor: 'whitesmoke', color: 'black', height: '100px', fontWeight: 'bold' }}>
          NEWS
        </div>
        <div className="col-md-6 p-3 text-center" style={{ backgroundColor: 'darkgray', color: '#fff', height: '100px', fontWeight: 'bold' }}>
          CONTACT
        </div>
      </div>
    </div>
  );
}

export default Footer;