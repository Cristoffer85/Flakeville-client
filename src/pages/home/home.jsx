import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LiftsContext from '../../contexts/liftscontext/liftscontext.jsx';
import { fetchLifts } from '../../api/homeapi/homeapi.jsx';
import Footer from '../../components/footer/footer.jsx';
import skiliftLogo from '../../assets/skiliftlogo.png';

function Home() {
  const { lifts, setLifts } = useContext(LiftsContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLifts()
      .then((data) => setLifts(data))
      .catch((error) => console.error('Error fetching lifts:', error));
  }, [setLifts]);

  const handleLogoClick = () => {
    navigate('/liftinfo');
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '7rem' }}>
      <div className="d-flex flex-grow-1">
        <div className="p-3" style={{ width: '200px', marginLeft: '4rem', marginTop: '5rem' }}>
          
          {/* --------------- Sidebar content --------------- */}
          <div>
            <img
              src={skiliftLogo}
              alt="Ski Lift Logo"
              style={{ cursor: 'pointer', width: '60px', height: '60px' }}
              onClick={handleLogoClick}
              title='Lift Information'
            />
          </div>
        </div>

        {/* --------------- Main content --------------- */}
        <div className="flex-grow-1 p-3">
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Home;