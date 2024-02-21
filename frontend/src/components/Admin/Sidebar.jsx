// src/components/Sidebar.js
import React, { useState } from 'react';

function Sidebar({ onMenuItemClick }) {
  // State to manage the visibility of the dropdown content
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the visibility of the dropdown content
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle menu item clicks and update the content
  const handleMenuItem = (content) => {
    onMenuItemClick(content);
    setIsDropdownOpen(false); // Close the dropdown after clicking a menu item
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-w-72 h-full">
      <div className="py-7 px-2">
        <h2 className="text-2xl font-extrabold text-center">Admin Panel</h2>
        <nav className="mt-6">
          <ul>
            <li className="relative">
              {/* Dropdown toggle button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Product Management
                {/* Dropdown arrow */}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M6.586 8.586a2 2 0 0 1 2.828 0L12 11.172l2.586-2.586a2 2 0 1 1 2.828 2.828l-4 4a2 2 0 0 1-2.828 0l-4-4a2 2 0 0 1 0-2.828zM12 13.172l4-4 1.414 1.414-4 4-4-4 1.414-1.414z" />
                </svg>
              </button>
              {/* Dropdown content */}
              {isDropdownOpen && (
                <div className="pl-8 mt-2">
                  <ul className='list-disc'>
                    <li className="py-2">
                      <button
                        onClick={() => handleMenuItem('add-product')}
                        className="block px-4 rounded transition duration-200 hover:bg-gray-700"
                      >
                        Add Product
                      </button>
                    </li>
                    <li className="py-2">
                      <button
                        onClick={() => handleMenuItem('all-products')}
                        className="block px-4 rounded transition duration-200 hover:bg-gray-700"
                      >
                        All Products
                      </button>
                    </li>
                    {/* Add more menu items as needed */}
                  </ul>
                </div>
              )}
            </li>
            {/* Add more sidebar items here */}
            <li>
              <button
                onClick={() => handleMenuItem('categories')}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Category Management
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMenuItem('users')}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMenuItem('settings')}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
