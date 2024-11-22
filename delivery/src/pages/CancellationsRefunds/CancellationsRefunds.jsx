// src/components/CancellationsRefunds/CancellationsRefunds.jsx

import React, { useState } from 'react';
import './CancellationsRefunds.css';
import { toast } from 'react-toastify';

const mockData = [
  { id: 1, customerName: 'John Doe', orderNumber: 'ORD001', reason: 'Delayed delivery', refundStatus: 'Pending' },
  { id: 2, customerName: 'Jane Smith', orderNumber: 'ORD002', reason: 'Wrong item', refundStatus: 'Approved' },
  { id: 3, customerName: 'Mike Wilson', orderNumber: 'ORD003', reason: 'Damaged item', refundStatus: 'Pending' },
];

const CancellationsRefunds = () => {
  const [cancellations, setCancellations] = useState(mockData);

  const handleRefund = (id) => {
    setCancellations((prevData) =>
      prevData.map((order) =>
        order.id === id ? { ...order, refundStatus: 'Approved' } : order
      )
    );
    toast.success('Refund processed successfully.');
  };

  return (
    <div className="cancellations-refunds">
      <h2>Cancellations & Refund Management</h2>
      <table className="cancellations-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Customer Name</th>
            <th>Reason</th>
            <th>Refund Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cancellations.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.customerName}</td>
              <td>{order.reason}</td>
              <td className={`status ${order.refundStatus.toLowerCase()}`}>
                {order.refundStatus}
              </td>
              <td>
                {order.refundStatus === 'Pending' ? (
                  <button onClick={() => handleRefund(order.id)} className="refund-btn">
                    Initiate Refund
                  </button>
                ) : (
                  <span>Processed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancellationsRefunds;
