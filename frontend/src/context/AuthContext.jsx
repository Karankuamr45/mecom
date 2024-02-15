import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Only runs once on component mount

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    console.log("setIsAuthenticated is set to be tru after successful login",isAuthenticated)
    console.log("setIsAuthenticated is set to be tru after successful login userdata",user)
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    console.log("isAuthenticated after login in useEffect:", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("User data after login in useEffect:", user);
  }, [user]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
