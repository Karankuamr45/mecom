// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const location = useLocation();

  // Define an array of routes where you want to hide the Navbar
  const hideNavbarRoutes = ['/otp-verification'];

  // Check if the current route is in the hideNavbarRoutes array
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className={`container mx-auto mt-4 ${hideNavbar ? 'pt-0' : 'pt-24'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
