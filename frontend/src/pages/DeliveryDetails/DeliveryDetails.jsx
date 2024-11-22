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
          <strong>Partner Name:</strong> {order.deliveryPartner.name || 'N/A'}
        </p>
        <p>
          <strong>Partner Contact:</strong> {order.deliveryPartner.phone || 'N/A'}
        </p>
        <p>
          <strong>Delivery Status:</strong> {order.status}
        </p>
        <p>
          <strong>Estimated Delivery:</strong> {`${order.estimatedDeliveryTime ?? "-"} min` || 'N/A'}
        </p>
        <p>
          <strong>Delivery Address:</strong> {JSON.stringify(order.address)}
        </p>
      </div>
    </div>
  );
};

export default DeliveryDetails;
