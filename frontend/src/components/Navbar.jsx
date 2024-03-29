import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const navigate =useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    closeMenu()
    navigate('/login')
  };

  return (
    <nav className="bg-gray-800 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white">
              Logo
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              {!isAuthenticated && (
                <Link to="/register" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              )}
              {isAuthenticated && user && user.role === 'admin' && (
                <Link to="/dashboard" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              )}
              {isAuthenticated && (
                <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              )}
            </div>
          </div>
          <div className="block md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Responsive menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            {!isAuthenticated && (
              <Link to="/register" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</Link>
            )}
            {isAuthenticated && user && user.role === 'admin' && (
              <Link to="/dashboard" onClick={closeMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
