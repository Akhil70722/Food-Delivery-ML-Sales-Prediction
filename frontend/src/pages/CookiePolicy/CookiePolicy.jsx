import React from 'react';
import './CookiePolicy.css'; // Import specific CSS for Cookie Policy

const CookiePolicy = () => {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>Cookie Policy</h1>
      <p>
        Our website uses cookies to improve your browsing experience. By using our website, you consent to our cookie policy:
      </p>
      <ul>
        <li>Cookies are small text files that are stored on your device to enhance website functionality.</li>
        <li>We use cookies to remember your preferences and deliver personalized content.</li>
        <li>You can disable cookies in your browser settings, but this may limit website functionality.</li>
        <li>We do not share cookie data with third parties.</li>
      </ul>
      <p>
        For any concerns about cookies, contact us at <b>contact@can3onwheels.com</b>.
      </p>
    </div>
  );
};

export default CookiePolicy;
