import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please provide both email and password.');
      }

      const response = await axios.post('http://localhost:4500/auth/login', { email, password });
      
      const token = response.data.token;
      
      const userData = response.data.user; 

      if (!userData) {
        throw new Error('User data is not available.');
      }
      localStorage.setItem('token', token);
      
      login(userData); 
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401 || 404) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-200 p-8 rounded-lg shadow-md relative">
      {loading && ( // Show transparent background when loading is true
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
            disabled={loading} 
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
            disabled={loading} 
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
        Forgot your password? <Link to="/forgot-password" className="text-blue-500 hover:underline">Reset it here</Link>.
      </p>        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {/* Sign up line */}
      <p className="mt-4 text-black text-sm text-center">Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link></p>
    </div>
  );
}

export default Login;
