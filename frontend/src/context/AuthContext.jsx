import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    try {
      setError(null); // Clear any previous errors
      const response = await axios.post('http://localhost:4500/auth/register', userData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      // Set the error state with the specific error message from the server response
      setError(error.response ? error.response.data.message : 'Registration failed');
      console.error('Registration failed:', error);
      throw error; // Re-throw the error for handling in the component
    }
  };
  
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4500/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
