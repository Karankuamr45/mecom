// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://mecom-jvcy.onrender.com/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setPassword("")
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="password" 
            placeholder="Enter new password" 
            value={password} 
            onChange={handlePasswordChange} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ResetPassword;
