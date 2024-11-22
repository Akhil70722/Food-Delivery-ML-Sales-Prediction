import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="List" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="/delivery/orders"
          className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
        >
          <img src="/icons/order-icon.svg" alt="Orders Icon" />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/adddeliverypartner' className="sidebar-option">
          <img src={assets.order_icon} alt="deli" />
          <p>Add Delivery Partner</p>
        </NavLink>
        <NavLink to='/userhelpandsupport' className="sidebar-option">
          <img src={assets.order_icon} alt="deli" />
          <p>User Help and Support</p>
        </NavLink>
        {/* <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink> */}
        <NavLink to='/customer-profiles' className="sidebar-option">
          <img src={assets.customer_icon} alt="Customer Profiles" />
          <p>Customer Profiles</p>
        </NavLink>
        {/* <NavLink to='/restock-alerts' className="sidebar-option">
          <img src={assets.alert_icon} alt="Restock Alerts" />
          <p>Restock Alerts</p>
        </NavLink> */}
        <NavLink to='/supplier-management' className="sidebar-option">
          <img src={assets.supplier_icon} alt="Supplier Management" />
          <p>Supplier Management</p>
        </NavLink>
        <NavLink to='/cancellations-refunds' className="sidebar-option">
          <img src={assets.refund_icon} alt="Cancellations & Refunds" />
          <p>Cancellations & Refunds</p>
        </NavLink>
        <NavLink to='/feedback-response' className="sidebar-option">
          <img src={assets.feedback_icon} alt="Feedback" />
          <p>Feedback Response</p>
        </NavLink>
        <NavLink to='/productanalysis' className="sidebar-option">
          <img src={assets.revenue_icon} alt="" />
          <p>Product Analysis</p>
        </NavLink>
        <NavLink to='/revenue-tracking' className="sidebar-option">
          <img src={assets.revenue_icon} alt="Revenue Tracking" />
          <p>Revenue Tracking</p>
        </NavLink>
        <NavLink to='/profit-analysis' className="sidebar-option">
          <img src={assets.profit_icon} alt="Profit Analysis" />
          <p>Profit Analysis</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
