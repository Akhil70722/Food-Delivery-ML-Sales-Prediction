import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
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
      </div>
    </div>
  );
};

export default Sidebar;
