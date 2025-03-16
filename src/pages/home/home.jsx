import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LiftsContext from '../../contexts/liftscontext/liftscontext.jsx';
import { fetchLifts } from '../../api/homeapi/homeapi.jsx';
import Footer from '../../components/footer/footer.jsx';
import skiliftLogo from '../../assets/skiliftlogo.png';
import weatherLogo from '../../assets/weatherlogo.png'; // Import the weather logo

function Home() {
  const { lifts, setLifts } = useContext(LiftsContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLifts()
      .then((data) => setLifts(data))
      .catch((error) => console.error('Error fetching lifts:', error));
  }, [setLifts]);

  const handleLiftLogoClick = () => {
    navigate('/liftinfo');
  };

  const handleWeatherLogoClick = () => {
    navigate('/weather');
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
              onClick={handleLiftLogoClick}
              title='Lift Information'
            />
          </div>
          <div className="mt-3">
            <img
              src={weatherLogo}
              alt="Weather Logo"
              style={{ cursor: 'pointer', width: '52px', height: '46px' }}
              onClick={handleWeatherLogoClick}
              title='Weather Information'
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