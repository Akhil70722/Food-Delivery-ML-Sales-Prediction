import React from 'react';
import { useLocation } from 'react-router-dom';
import './DeliveryDetails.css';

const DeliveryDetails = () => {
  const location = useLocation();
  const { order } = location.state; // Access the passed order data

  return (
    <div className='delivery-details'>
      <h2>Delivery Partner Details</h2>
      <div className='details-container'>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Partner Name:</strong> {order.deliveryPartnerName || 'N/A'}
        </p>
        <p>
          <strong>Partner Contact:</strong> {order.deliveryPartnerContact || 'N/A'}
        </p>
        <p>
          <strong>Delivery Status:</strong> {order.status}
        </p>
        <p>
          <strong>Estimated Delivery:</strong> {order.estimatedDelivery || 'N/A'}
        </p>
        <p>
          <strong>Delivery Address:</strong> {order.deliveryLocation}
        </p>
      </div>
    </div>
  );
};

export default DeliveryDetails;
