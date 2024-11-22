import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link styling

const DeliverySidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        {/* Example Sidebar Options */}
        <NavLink 
          to="/delivery/orders"
          className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
        >
          <img src="/icons/order-icon.svg" alt="Orders Icon" />
          <p>Orders</p>
        </NavLink>

        <NavLink 
          to="/delivery/tracking"
          className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
        >
          <img src="/icons/tracking-icon.svg" alt="Tracking Icon" />
          <p>Tracking</p>
        </NavLink>

        <NavLink 
          to="/delivery/settings"
          className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
        >
          <img src="/icons/settings-icon.svg" alt="Settings Icon" />
          <p>Settings</p>
        </NavLink>
      </div>
    </div>
  );
};

export default DeliverySidebar;
