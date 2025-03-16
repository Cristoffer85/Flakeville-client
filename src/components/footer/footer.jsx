import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid p-0 mt-auto">
      <div className="row">
        <div className="col-12 p-3 text-center" style={{ backgroundColor: '#343a40', color: 'white', height: '100px', fontWeight: '600' }}>
          <p>Random row for sponsoring partners</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-3 text-center" style={{ backgroundColor: '#343a40', color: 'black', height: '100px', fontWeight: 'bold' }}>
          More about Flakeville
        </div>
        <div className="col-md-6 p-3 text-center" style={{ backgroundColor: '#343a40', color: 'black', height: '100px', fontWeight: 'bold' }}>
          Contact
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-3 text-center" style={{ backgroundColor: '#343a40', color: 'black', height: '100px', fontWeight: '600' }}>
          <p>Flakeville Co, Icehill 43, 799 25 Powdertown. Org. nr:559048-1337</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;