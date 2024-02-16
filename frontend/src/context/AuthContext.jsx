import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set isAuthenticated to true if token exists
      setIsAuthenticated(true);

      // Retrieve user data from local storage
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser(userData);
    }
  }, []); // Run only once when the component mounts

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData'); // Remove user data from local storage
    setIsAuthenticated(false);
    setUser(null);
  };

  // useEffect(() => {
  //   console.log('isAuthenticated in AuthContext:', isAuthenticated);
  // }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
