// src/pages/Delivery/Delivery.jsx
import React from 'react';
import './Delivery.css'; // Assuming you have a CSS file for styling

const Delivery = () => {
  return (
    <div className="delivery-container">
      <h1>Delivery Information</h1>
      <p>
        At <strong>CAN3 ON WHEELS</strong>, we are committed to providing a seamless delivery experience for our customers. Below are the key details regarding our delivery services:
      </p>
      
      <div className="delivery-info">
        <div className="delivery-section">
          <h2>Delivery Areas</h2>
          <p>
            We currently deliver to the IIM Bodhgaya campus and nearby areas. Please ensure that your delivery address falls within our service zones for timely delivery.
          </p>
        </div>

        <div className="delivery-section">
          <h2>Delivery Hours</h2>
          <p>
            Our delivery service operates from <strong>8:00 AM to 11:00 PM</strong> daily. Orders can be placed any time during these hours, and we strive to deliver as quickly as possible.
          </p>
        </div>

        <div className="delivery-section">
          <h2>Delivery Charges</h2>
          <p>
            A fixed delivery fee of <strong>₹50</strong> applies to all orders. 
          </p>
        </div>

        <div className="delivery-section">
          <h2>Order Tracking</h2>
          <p>
            After placing your order, you will receive a confirmation email with a tracking link. You can use this link to track your order in real time.
          </p>
        </div>

        <div className="delivery-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns regarding your delivery, please don’t hesitate to contact our customer service team at <strong>+1-212-456-7890</strong> or <strong>contact@can3onwheels.com</strong>.
          </p>
        </div>

        <div className="delivery-section">
          <h2>Feedback</h2>
          <p>
            We value your feedback! After your order is delivered, please take a moment to rate your experience. Your insights help us improve our services and offerings.
          </p>
        </div>
      </div>
      
      <p>
        Thank you for choosing <strong>CAN3 ON WHEELS</strong>! We look forward to serving you soon.
      </p>
    </div>
  );
};

export default Delivery;
