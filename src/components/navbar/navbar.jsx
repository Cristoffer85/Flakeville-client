import React, { useState, useEffect } from 'react';
import NavbarRegular from './regular/navbarregular';
import NavbarMobile from './mobile/navbarmobile';

function Navbar({ handleLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <NavbarMobile handleLogout={handleLogout} />
  ) : (
    <NavbarRegular handleLogout={handleLogout} />
  );
}

export default Navbar;
