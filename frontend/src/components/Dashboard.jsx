import React from 'react';
import UserDetails from './Admin/UserDetails';
import ProductList from './Admin/ProductList';
import AddProductForm from './Admin/AddProductForm';
import UpdateProductForm from './Admin/UpdateProductForm';
import Chart from './Admin/Chart';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 flex-shrink-0 w-full lg:w-64">
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard {user && user.username}</h2>
        <UserDetails user={user} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h3 className="text-xl font-semibold mb-4">Product Management</h3>
        <ProductList />
        <AddProductForm />
        <UpdateProductForm />
      </div>

      {/* Right Sidebar (Optional) */}
      <div className="hidden lg:block bg-gray-200 p-4 w-64">
        <h3 className="text-xl font-semibold mb-4">Analytics</h3>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
