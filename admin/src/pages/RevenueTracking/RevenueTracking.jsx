// src/components/RevenueTracking/RevenueTracking.jsx
import React from 'react';
import './RevenueTracking.css';

const RevenueTracking = () => {
  // Sample data for revenue tracking (in Rupees)
  const monthlyRevenue = [
    { month: 'January', amount: 50000 },
    { month: 'February', amount: 60000 },
    { month: 'March', amount: 75000 },
    { month: 'April', amount: 80000 },
    { month: 'May', amount: 95000 },
    { month: 'June', amount: 85000 },
    { month: 'July', amount: 90000 },
    { month: 'August', amount: 100000 },
    { month: 'September', amount: 110000 },
    { month: 'October', amount: 120000 },
    { month: 'November', amount: 115000 },
    { month: 'December', amount: 130000 },
  ];

  return (
    <div className="revenue-tracking">
      <h2>Monthly Revenue Tracking</h2>
      <table className="revenue-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue (in ₹)</th>
          </tr>
        </thead>
        <tbody>
          {monthlyRevenue.map((data, index) => (
            <tr key={index}>
              <td>{data.month}</td>
              <td>₹ {data.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTracking;
