import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Set loading to false when component mounts
  }, []);

  // useEffect(() => {
  //   console.log('isAuthenticated in PrivateRoute:', isAuthenticated);
  // }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while waiting for authentication state
  }

  if (isAuthenticated && user && user.role === 'admin') {
    return <Outlet />; // Allow access to the dashboard for admin users
  } else {
    return <Navigate to="/login" replace />; // Redirect to the login page for non-admin users
  }
};

export default PrivateRoute;
