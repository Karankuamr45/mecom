// Dashboard.js

import React, { useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();
  

  // useEffect(() => {
  //   // Redirect to home page if user is not authenticated
  //   if (!user) {
  //     console.log('user on dashboard useeffect',user)
  //     navigate('/login');
  //   } else if (user.role !== 'admin') {
  //     // Redirect to another page (e.g., access denied page) if user is not an admin
  //     navigate('/');
  //   }
  // }, [user, navigate]);
  console.log(user)

  return (
    <div>
      {user && (
        <div>
          <h1>Welcome to the Dashboard, {user.username}!</h1>
          {/* Dashboard content */}
        </div>
      )}
      <h1>dash</h1>
    </div>
  );
};

export default Dashboard;
