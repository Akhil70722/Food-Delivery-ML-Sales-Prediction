import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleTrackClick = () => {
    if (!orderId) {
      alert('Please enter an order ID');
      return;
    }

    // Redirect directly to the DeliveryDetails page when the user clicks track order
    navigate('/delivery-details'); // Redirect to the delivery partner details page
  };

  return (
    <div className="track-order-container">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)} // Handle input change
      />
      <button onClick={handleTrackClick}>Track Order</button>
    </div>
  );
};

export default TrackOrder;
