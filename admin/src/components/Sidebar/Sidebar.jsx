import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial width of the sidebar

  const handleMouseDown = (e) => {
    const startX = e.clientX; // Initial mouse position
    const startWidth = sidebarWidth;

    const onMouseMove = (event) => {
      const newWidth = startWidth + (event.clientX - startX); // Calculate new width
      if (newWidth >= 200 && newWidth <= 500) { // Set min and max width limits
        setSidebarWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className="sidebar"
      style={{ width: `${sidebarWidth}px` }} // Dynamic width
    >
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="List" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="/delivery/orders"
          className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
        >
          <p>Orders</p>
        </NavLink>
        <NavLink to="/adddeliverypartner" className="sidebar-option">
          <img src={assets.order_icon} alt="deli" />
          <p>Add Delivery Partner</p>
        </NavLink>
        <NavLink to="/userhelpandsupport" className="sidebar-option">
          <img src={assets.order_icon} alt="deli" />
          <p>User Help and Support</p>
        </NavLink>
        <NavLink to="/customer-profiles" className="sidebar-option">
          <img src={assets.customer_icon} alt="Customer Profiles" />
          <p>Customer Profiles</p>
        </NavLink>
        <NavLink to="/supplier-management" className="sidebar-option">
          <img src={assets.supplier_icon} alt="Supplier Management" />
          <p>Supplier Management</p>
        </NavLink>
        <NavLink to="/cancellations-refunds" className="sidebar-option">
          <img src={assets.refund_icon} alt="Cancellations & Refunds" />
          <p>Cancellations & Refunds</p>
        </NavLink>
        <NavLink to="/feedback-response" className="sidebar-option">
          <img src={assets.feedback_icon} alt="Feedback" />
          <p>Feedback Response</p>
        </NavLink>
        <NavLink to="/productanalysis" className="sidebar-option">
          <img src={assets.revenue_icon} alt="" />
          <p>Product Analysis</p>
        </NavLink>
        <NavLink to="/revenue-tracking" className="sidebar-option">
          <img src={assets.revenue_icon} alt="Revenue Tracking" />
          <p>Revenue Tracking</p>
        </NavLink>
        <NavLink to="/profit-analysis" className="sidebar-option">
          <img src={assets.profit_icon} alt="Profit Analysis" />
          <p>Profit Analysis</p>
        </NavLink>
        <NavLink to='/sales-analysis' className="sidebar-option">
          <img src={assets.analysis_icon} alt="Sales Analysis" />
          <p>Sales Analysis</p>
        </NavLink>
      </div>
      <div
        className="sidebar-resize"
        onMouseDown={handleMouseDown} // Attach resize handler
      ></div>
    </div>
  );
};

export default Sidebar;
