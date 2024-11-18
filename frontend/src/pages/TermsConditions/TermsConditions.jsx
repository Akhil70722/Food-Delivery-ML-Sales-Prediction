import React from 'react';
import './TermsConditions.css'; // Import specific CSS for Terms & Conditions

const TermsConditions = () => {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>Terms & Conditions</h1>
      <p>
        Welcome to CAN3 ON WHEELS! By accessing our website, you agree to comply with the following terms and conditions:
      </p>
      <ul>
        <li>All content provided on this site is for informational purposes only.</li>
        <li>You agree not to misuse the website or its services.</li>
        <li>All purchases are subject to our refund and return policy.</li>
        <li>We reserve the right to modify or discontinue the service at any time.</li>
      </ul>
      <p>
        For further inquiries, please contact us at <b>contact@can3onwheels.com</b>.
      </p>
    </div>
  );
};

export default TermsConditions;
