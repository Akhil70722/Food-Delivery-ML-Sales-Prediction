// src/pages/Admin/Admin.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBoxes, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <div className="admin-section" onClick={() => window.location.href = "/customer-profiles"}>
          <FontAwesomeIcon icon={faUser} size="3x" />
          <h3>Customer Profiles</h3>
        </div>
        <div className="admin-section" onClick={() => window.location.href = "/supplier-management"}>
          <FontAwesomeIcon icon={faBoxes} size="3x" />
          <h3>Supplier Management</h3>
        </div>
        <div className="admin-section" onClick={() => window.location.href = "/restock-alerts"}>
          <FontAwesomeIcon icon={faBell} size="3x" />
          <h3>Restock Alerts</h3>
        </div>
      </div>
    </div>
  );
};

export default Admin;
