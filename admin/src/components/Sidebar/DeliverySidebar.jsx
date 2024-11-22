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
          <p>Orders</p>
        </NavLink>

        <NavLink
          to="/delivery/tracking"
          className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
        >
          <p>Tracking</p>
        </NavLink>
      </div>
    </div>
  );
};

export default DeliverySidebar;
