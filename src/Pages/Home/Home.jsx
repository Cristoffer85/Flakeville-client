import React, { useContext, useEffect } from 'react';
import LiftsContext from '../../Contexts/LiftsContext/LiftsContext';
import { fetchLifts } from '../../Api/HomeApi/HomeApi';
import Footer from '../../Components/Footer/Footer';
import './Home.css';

function Home() {
  const { lifts, setLifts } = useContext(LiftsContext);

  useEffect(() => {
    fetchLifts()
      .then((data) => setLifts(data))
      .catch((error) => console.error('Error fetching lifts:', error));
  }, [setLifts]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <div className="p-3" style={{ width: '200px', marginTop: '5rem' }}>
          
          {/* Sidebar content */}
          <div>
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
        </div>

        {/* Main content */}
        <div className="flex-grow-1 p-3">
          <p>This is the main content area.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;