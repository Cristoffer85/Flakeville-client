import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer.jsx';
import skiliftLogo from '../../assets/skiliftlogo.png';
import weatherLogo from '../../assets/weatherlogo.png';
import video1 from '../../assets/video1.mp4';
import video2 from '../../assets/video2.mp4';
import video3 from '../../assets/video3.mp4';
import video4 from '../../assets/video4.mp4';

function Home() {
  const navigate = useNavigate();

  const handleLiftLogoClick = () => {
    navigate('/liftinfo');
  };

  const handleWeatherLogoClick = () => {
    navigate('/weather');
  };

  const videos = [video1, video2, video3, video4];

  return (
    <>
      {/* Main Content Container with no horizontal padding */}
      <div className="container-fluid px-0" style={{ paddingTop: '7rem' }}>
        <div className="row gx-0">
          {/* Sidebar Column */}
          <div className="col-md-2 col-3 mb-3 mb-md-0">
            <div className="p-3 sticky-top" style={{ top: '7rem' }}>
              <img
                src={skiliftLogo}
                alt="Ski Lift Logo"
                style={{ cursor: 'pointer', width: '60px', height: '60px' }}
                onClick={handleLiftLogoClick}
                title="Lift Information"
              />
              <div className="mt-3">
                <img
                  src={weatherLogo}
                  alt="Weather Logo"
                  style={{ cursor: 'pointer', width: '52px', height: '46px' }}
                  onClick={handleWeatherLogoClick}
                  title="Weather Information"
                />
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="col-md-8 col-12">


            {/* Section 1: Title and Text Shifted Higher Up */}
            <div
              className="d-flex flex-column align-items-center text-center"
              style={{
                minHeight: '50vh',
                paddingTop: '9rem',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow for better readability
              }}
            >
              <h1 className="display-4">Welcome to Flakeville</h1>
              <p className="lead">
                Probably your best vacation experience for both powder, relaxation while staying connected to your skiing buddies.
              </p>
            </div>


            {/* Section 2: Videos Centered */}
            <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light" style={{ marginTop: '19rem' }}>
              <div className="w-100">
                <h2 className="text-center mb-4">Example videos [Drone]</h2>
                <div className="d-flex justify-content-center flex-wrap">
                  {videos.map((videoSrc, idx) => (
                    <div key={idx} className="mx-2" style={{ minWidth: '320px' }}>
                      <video width="320" height="180" controls>
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support HTML5 video.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Section 3: Random Content */}
            <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-secondary" style={{ color: 'white', marginTop: '19rem', marginBottom: '6rem' }}>
              <div className="w-100">
                <h2 className="text-center mb-4">Random Content</h2>
                <p className="text-center">
                  This is for now just an empty random box, which will later be filled with more relevant content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer placed outside the container-fluid to stretch full width */}
      <footer className="w-100" style={{ backgroundColor: '#343a40', margin: '0' }}>
        <Footer />
      </footer>
    </>
  );
}

export default Home;