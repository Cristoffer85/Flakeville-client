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
    <div className="container mt-5">
      <h1>Lift Information</h1>
      <ul className="list-group">
        {lifts.map((lift) => (
          <div key={lift.id} className="lift-container d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-0">Lift {lift.id}</h3>
              <p className="mb-0 text">{lift.description}</p>
            </div>
            <div className={`sidebar-status-light ${lift.operating ? 'green' : 'red'}`}></div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LiftInfo;