import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth(); // Destructure the error state from useAuth

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Clear the error message when the user types in the field again
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await register(formData);
        console.log('response of registration', response);
  
        // Clear form data and errors on successful registration
        setFormData({ username: '', email: '', password: '' });
        setErrors({ username: '', email: '', password: '' });
  
        // Redirect the user to the OTP verification page
        navigate('/otp-verification');
      } catch (error) {
        // Update the error state with the specific error message
        console.error('Error during registration:', error);
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
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Render the error message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.username ? 'border-red-500' : ''}`} />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`} />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`} />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
