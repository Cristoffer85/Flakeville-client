import React, { useContext, useEffect } from 'react';
import LiftsContext from '../../contexts/liftscontext/liftscontext';
import { fetchLifts } from '../../api/homeapi/homeapi';
import Footer from '../../components/footer/footer';
import './Home.css';

function Home() {
  const { lifts, setLifts } = useContext(LiftsContext);

  useEffect(() => {
    fetchLifts()
      .then((data) => setLifts(data))
      .catch((error) => console.error('Error fetching lifts:', error));
  }, [setLifts]);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '7rem' }}>
      <div className="d-flex flex-grow-1">
        <div className="p-3" style={{ width: '200px' }}>
          
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
          <p></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;