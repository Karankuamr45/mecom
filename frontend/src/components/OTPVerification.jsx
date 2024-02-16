import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OTPVerification = () => {
  const {login} = useAuth()
  const [otp, setOTP] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token');

      // Send the OTP and token to the backend for verification
      const response = await axios.post(
        'http://localhost:4500/auth/verify-otp',
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the Authorization header
          }
        }
      );

      // Handle successful verification
      login(response.data.user)
      navigate('/');

    } catch (error) {
      // Handle verification errors
      console.error('Error verifying OTP:', error);
      setVerificationError('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="py-8 px-4">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">OTP Verification</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="otp"
                  required
                  value={otp}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
            </div>
            {verificationError && <p className="text-red-500">{verificationError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
