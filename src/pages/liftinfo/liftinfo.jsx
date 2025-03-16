import React, { useContext, useEffect } from 'react';
import LiftsContext from '../../contexts/liftscontext/liftscontext.jsx';
import { fetchLifts } from '../../api/homeapi/homeapi.jsx';
import './liftinfo.css';

function LiftInfo() {
  const { lifts, setLifts } = useContext(LiftsContext);

  useEffect(() => {
    fetchLifts()
      .then((data) => setLifts(data))
      .catch((error) => console.error('Error fetching lifts:', error));
  }, [setLifts]);

  return (
    <div className="container mt-5" style={{ paddingTop: '7rem' }}>
      <h1 className="mb-4">Lift Information</h1>
      <div className="row">
        {lifts.map((lift) => (
          <div key={lift.id} className="col-md-6 mb-4">
            <div className="card lift-card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="card-title mb-0">Lift {lift.id}</h3>
                  <p className="card-text">{lift.description}</p>
                </div>
                <div className={`status-indicator ${lift.operating ? 'bg-success' : 'bg-danger'}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiftInfo;