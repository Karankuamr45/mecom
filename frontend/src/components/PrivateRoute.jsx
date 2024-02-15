// PrivateRoute.jsx
import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log('isAuthenticated in PrivateRoute:', isAuthenticated);
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login"  />
  );
};

export default PrivateRoute;
