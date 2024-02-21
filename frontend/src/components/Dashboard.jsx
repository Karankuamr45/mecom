// src/components/Dashboard.js
import React, { useState } from 'react';
import DefaultContent from './Admin/DefaultContent';
import Sidebar from './Admin/Sidebar';
import UserDetails from './Admin/UserDetails'
import AddProductForm from './Admin/AddProductForm'
import ProductList from './Admin/ProductList'
// Assume you have a DefaultContent component for the default view

function Dashboard() {
  // State to manage which content to display
  const [selectedContent, setSelectedContent] = useState(null);

  // Function to handle menu item clicks and update the selected content
  const handleMenuItemClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onMenuItemClick={handleMenuItemClick} />
      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        {/* Render selected content based on state, default to DefaultContent */}
        {selectedContent === 'add-product' && <AddProductForm />}
        {selectedContent === 'all-products' && <ProductList />}
        {/* {selectedContent === 'products' && <ProductContent />} */}
        {/* {selectedContent === 'categories' && <CategoryContent />} */}
        {selectedContent === 'users' && <UserDetails />}
        {/* {selectedContent === 'settings' && <SettingsContent />} */}
        {/* Default content when no menu item is selected */}
        {selectedContent === null && <DefaultContent />}
      </div>
    </div>
  );
}

export default Dashboard;
