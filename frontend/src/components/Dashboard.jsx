import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import UserDetails from "./Admin/UserDetails";
import ProductList from "./Admin/ProductList";
import AddProductForm from "./Admin/AddProductForm";
import UpdateProductForm from "./Admin/UpdateProductForm";
import OrderList from "./Admin/OrderList";
import InventoryList from "./Admin/InventoryList";
import Settings from "./Admin/Settings";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({
    userManagement: false,
    productManagement: false,
    orderManagement: false,
    inventoryManagement: false,
    settings: false,
  });

  const renderSubMenu = (submenu) => {
    switch (submenu) {
      case "userManagement":
        return <UserDetails user={user} />;
      case "productManagement":
        return (
          <>
            <ProductList />
            <AddProductForm />
            <UpdateProductForm />
          </>
        );
      case "orderManagement":
        return <OrderList />;
      case "inventoryManagement":
        return <InventoryList />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: !dropdownOpen[dropdown],
    });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 w-64">
        <h2 className="text-2xl font-semibold mb-4">
          Admin {user && user.username}
        </h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${
              activePage === "userManagement" && "bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("userManagement");
              toggleDropdown("userManagement");
            }}
          >
            User Management
            {dropdownOpen.userManagement ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 ml-1" />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-4 h-4 ml-1"
              />
            )}
            {dropdownOpen.userManagement &&
              renderSubMenu("userManagement")}
          </li>
          <li className="border-b border-gray-700"></li>
          <li
            className={`cursor-pointer ${
              activePage === "productManagement" && "bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("productManagement");
              toggleDropdown("productManagement");
            }}
          >
            Product Management
            {dropdownOpen.productManagement ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 ml-1" />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-4 h-4 ml-1"
              />
            )}
            {dropdownOpen.productManagement &&
              renderSubMenu("productManagement")}
          </li>
          <li className="border-b border-gray-700"></li>
          <li
            className={`cursor-pointer ${
              activePage === "orderManagement" && "bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("orderManagement");
              toggleDropdown("orderManagement");
            }}
          >
            Order Management
            {dropdownOpen.orderManagement ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 ml-1" />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-4 h-4 ml-1"
              />
            )}
            {dropdownOpen.orderManagement &&
              renderSubMenu("orderManagement")}
          </li>
          <li className="border-b border-gray-700"></li>
          <li
            className={`cursor-pointer ${
              activePage === "inventoryManagement" && "bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("inventoryManagement");
              toggleDropdown("inventoryManagement");
            }}
          >
            Inventory Management
            {dropdownOpen.inventoryManagement ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 ml-1" />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-4 h-4 ml-1"
              />
            )}
            {dropdownOpen.inventoryManagement &&
              renderSubMenu("inventoryManagement")}
          </li>
          <li className="border-b border-gray-700"></li>
          <li
            className={`cursor-pointer ${
              activePage === "settings" && "bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("settings");
              toggleDropdown("settings");
            }}
          >
            Settings
            {dropdownOpen.settings ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 ml-1" />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-4 h-4 ml-1"
              />
            )}
            {dropdownOpen.settings && renderSubMenu("settings")}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        {/* Render main content based on activePage */}
        {renderSubMenu(activePage)}
      </div>
    </div>
  );
};

export default Dashboard;
