import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegistrationForm = () => {
  const { isAuthenticated, login} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // State to manage loading status

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect if already authenticated
    }
  }, [isAuthenticated, navigate]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  //   setErrors({
  //     ...errors,
  //     [name]: '' // Clear the error message when the user types in the field again
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    // Normalize the username to lowercase
    if (name === 'username') {
      updatedValue = value.toLowerCase();
    }
  
    setFormData({
      ...formData,
      [name]: updatedValue
    });
  
    setErrors({
      ...errors,
      [name]: '' // Clear the error message when the user types in the field again
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading when form is submitted
      try {
        const response = await axios.post('http://localhost:4500/auth/register', formData);
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // Clear form data and errors on successful registration
        setFormData({ username: '', email: '', password: '' });
        setErrors({ username: '', email: '', password: '' });
  
        // Redirect the user to the OTP verification page
        // login(response.data.user)
        navigate('/otp-verification');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          // Check the error message and update the errors state accordingly
          if (errorMessage === 'Email is already registered') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: errorMessage
            }));
          } else if (errorMessage === 'Username is already taken') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              username: errorMessage
            }));
          } else {
            console.error('Error during registration:', errorMessage);
            // You can set a general error message here
          }
        } else {
          console.error('Error during registration:', error);
          // You can set a general error message here
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="max-w-md mx-auto mt-8  p-8 rounded-lg shadow-lg bg-gray-200 relative">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
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

      <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.username ? 'border-red-500' : ''}`} 
            disabled={loading} 
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`} 
            disabled={loading} 
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`} 
            disabled={loading} 
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          Register
        </button>
      </form>
      
      {/* Sign in line */}
      <p className="mt-4 text-black text-sm text-center">Already have an account? <Link to="/login" className="text-blue-500">Sign in</Link></p>
    </div>
  );
};

export default RegistrationForm;
