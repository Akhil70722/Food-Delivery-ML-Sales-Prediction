// src/components/PromoCode/PromoCode.jsx
import React, { useState } from 'react';
import './PromoCode.css'; // Ensure you have this CSS file

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');

  // List of valid promo codes
  const validPromoCodes = ['SAVE10', 'FREESHIP', 'DISCOUNT20'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the entered promo code is valid
    if (validPromoCodes.includes(promoCode.trim().toUpperCase())) {
      setMessage('Promo code applied successfully!');
    } else {
      setMessage('Wrong promo code!');
    }
    
    setPromoCode(''); // Clear the input after submission
  };

  return (
    <div className="promo-code-container">
      <h2>Enter Promo Code</h2>
      <form onSubmit={handleSubmit}> {/* Ensure the form has onSubmit */}
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)} // Update state on change
          placeholder="Enter your promo code"
          required
        />
        <button type="submit" className="promo-code-submit">
          Apply Code
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display the message if it exists */}
    </div>
  );
};

export default PromoCode;
